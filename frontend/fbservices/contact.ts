import { db } from "./firebaseClient";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

type Urgency = "Low" | "Normal" | "High" | "Critical";

export async function saveContactMessage(input: {
  name: string;
  email: string;
  company?: string;
  urgency: Urgency;
  message: string;
  company_website?: string; // honeypot
}) {
  const { name, email, company, urgency, message, company_website } = input;

  // honeypot: silently accept but do nothing
  if (company_website && company_website.trim() !== "") return;

  const createdAt = serverTimestamp();

  // 1) save the public message (this must succeed)
  await addDoc(collection(db, "contactMessages"), {
    name,
    email,
    company: company ?? "",
    urgency,
    message,
    status: "new",
    read: false,
    createdAt,
  });

  // 2) best-effort upsert into clients (rules require docId == lower-cased email, limited fields)
  const emailId = email.trim().toLowerCase();
  try {
    await setDoc(
      doc(db, "clients", emailId),
      {
        email: emailId,
        name,
        company: company ?? "",
        createdAt,
      },
      { merge: true } // allow later admin edits
    );
  } catch (e) {
    // do not block user if this fails (rules might be tighter or race conditions)
    console.warn("[clients upsert failed]", e);
  }
}
