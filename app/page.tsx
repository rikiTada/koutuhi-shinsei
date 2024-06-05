"use client";
import ContactForm from "@/components/contact-form";
import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ContactForm setIsLoading={setIsLoading} />
      <Toaster richColors />
      <Loading isLoading={isLoading} />
    </>
  );
}
