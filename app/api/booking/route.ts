const recipient = "vtcarrashdf@gmail.com";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "VTC ARRAS HDF <noreply@vtcarrashdf.fr>";

  if (!apiKey) {
    return Response.json(
      { error: "L’envoi des demandes n’est pas encore configuré." },
      { status: 503 }
    );
  }

  try {
    const payload = await request.json() as Record<string, unknown>;
    if (clean(payload.website, 200)) return Response.json({ ok: true });

    const departure = clean(payload.depart, 180);
    const destination = clean(payload.destination, 180);
    const date = clean(payload.date, 32);
    const time = clean(payload.heure, 32);

    if (!departure || !destination || !date || !time) {
      return Response.json({ error: "Merci de renseigner tous les champs." }, { status: 400 });
    }

    const text = [
      "Nouvelle demande de trajet — VTC ARRAS HDF",
      "",
      `Départ : ${departure}`,
      `Destination : ${destination}`,
      `Date : ${date}`,
      `Heure : ${time}`,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "vtc-arras-hdf-booking-form/1.0",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject: `Demande de trajet — ${date} à ${time}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected booking email", response.status, await response.text());
      return Response.json({ error: "L’envoi a échoué. Veuillez appeler le 06 82 54 58 49." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Unable to send booking email", error);
    return Response.json({ error: "L’envoi a échoué. Veuillez appeler le 06 82 54 58 49." }, { status: 500 });
  }
}
