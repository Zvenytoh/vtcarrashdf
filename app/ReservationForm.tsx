"use client";

import { FormEvent, useState } from "react";

export function ReservationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!response.ok) throw new Error("Booking request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <form className="booking" onSubmit={handleSubmit}>
    <label><span>Nom, prénom ou société</span><input name="client" placeholder="Comment vous appeler ?" autoComplete="name" required /></label>
    <label><span>Téléphone ou e-mail</span><input name="contact" placeholder="Pour vous recontacter" autoComplete="tel" required /></label>
    <label><span>Départ</span><input name="depart" placeholder="Votre adresse" autoComplete="street-address" required /></label>
    <label><span>Destination</span><input name="destination" placeholder="Où allez-vous ?" required /></label>
    <label><span>Date</span><input name="date" type="date" required /></label>
    <label><span>Heure</span><input name="heure" type="time" required /></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button button-light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Envoi en cours…" : <>Demander mon trajet <i aria-hidden="true" /></>}</button>
    {status === "success" && <p className="form-note" role="status">Votre demande est envoyée. Nous vous recontacterons rapidement.</p>}
    {status === "error" && <p className="form-note form-error" role="alert">L’envoi n’a pas abouti. Appelez-nous au 06 82 54 58 49.</p>}
  </form>;
}
