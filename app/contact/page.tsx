import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Chosen or apply to become a brand ambassador." };

export default function ContactPage() { return <ContactClient />; }
