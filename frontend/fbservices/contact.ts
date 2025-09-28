import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseClient";

type Urgency = "Low" | "Normal" | "High" | "Critical";

export async function saveContactMessage({
  name, email, company, urgency, message, company_website,
}: {
  name: string; email: string; company?: string; urgency: Urgency; message: string; company_website?: string;
}) {
  // honeypot spam check
  if (company_website && company_website.trim()) return;

  await addDoc(collection(db, "contactMessages"), {
    name: name.trim().slice(0, 120),
    email: email.trim().toLowerCase().slice(0, 160),
    company: company ? company.trim().slice(0, 200) : null,
    urgency,
    message: message.trim().slice(0, 5000),
    status: "new",                // optional (allowed by rules)
    createdAt: serverTimestamp(), // optional (allowed by rules)
  });
}
