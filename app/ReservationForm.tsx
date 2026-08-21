"use client";

import { FormEvent, useState } from "react";

const recipient = "vtcarrashdf@gmail.com";

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const departure = String(data.get("depart") ?? "");
    const destination = String(data.get("destination") ?? "");
    const date = String(data.get("date") ?? "");
    const time = String(data.get("heure") ?? "");
    const subject = "Demande de trajet — VTC ARRAS HDF";
    const body = `Bonjour,\n\nJe souhaite réserver un trajet :\n\nDépart : ${departure}\nDestination : ${destination}\nDate : ${date}\nHeure : ${time}\n\nMerci de me recontacter pour confirmer la disponibilité et le tarif.\n`;

    setSubmitted(true);
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <form className="booking" onSubmit={handleSubmit}>
    <label><span>Départ</span><input name="depart" placeholder="Votre adresse" autoComplete="street-address" required /></label>
    <label><span>Destination</span><input name="destination" placeholder="Où allez-vous ?" required /></label>
    <label><span>Date</span><input name="date" type="date" required /></label>
    <label><span>Heure</span><input name="heure" type="time" required /></label>
    <button className="button button-light" type="submit">Demander mon trajet <i>↗</i></button>
    {submitted && <p className="form-note" role="status">Votre application e-mail s’ouvre avec la demande prête à envoyer.</p>}
  </form>;
}
