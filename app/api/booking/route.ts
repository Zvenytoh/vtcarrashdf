const recipient = "vtcarrashdf@gmail.com";

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
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

    const client = clean(payload.client, 120);
    const contact = clean(payload.contact, 160);
    const departure = clean(payload.depart, 180);
    const destination = clean(payload.destination, 180);
    const date = clean(payload.date, 32);
    const time = clean(payload.heure, 32);

    if (!client || !contact || !departure || !destination || !date || !time) {
      return Response.json({ error: "Merci de renseigner tous les champs." }, { status: 400 });
    }

    const details = [
      ["Client", client],
      ["Coordonnées", contact],
      ["Départ", departure],
      ["Destination", destination],
      ["Date", date],
      ["Heure", time],
    ];

    const text = [
      "Nouvelle demande de trajet — VTC ARRAS HDF",
      "",
      `Client : ${client}`,
      `Coordonnées : ${contact}`,
      `Départ : ${departure}`,
      `Destination : ${destination}`,
      `Date : ${date}`,
      `Heure : ${time}`,
    ].join("\n");

    const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f2f0eb;color:#171717;font-family:Arial,sans-serif;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f0eb;padding:36px 16px;"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;"><tr><td style="background:#111214;padding:28px 34px;color:#f7f7f4;"><div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#b7aa92;">VTC ARRAS HDF</div><div style="font-family:Georgia,serif;font-size:31px;line-height:1.1;margin-top:14px;">Nouvelle demande<br>de trajet</div></td></tr><tr><td style="padding:32px 34px 22px;"><p style="margin:0 0 24px;font-size:15px;color:#5d5a55;">Une demande vient d’être envoyée depuis le site.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">${details.map(([label, value]) => `<tr><td style="padding:13px 0;border-top:1px solid #e4e0d8;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#857b6b;width:35%;vertical-align:top;">${label}</td><td style="padding:13px 0;border-top:1px solid #e4e0d8;font-size:15px;line-height:1.45;color:#171717;">${escapeHtml(value)}</td></tr>`).join("")}</table></td></tr><tr><td style="padding:0 34px 30px;"><div style="background:#f2f0eb;border-left:3px solid #b7aa92;padding:14px 16px;font-size:13px;line-height:1.5;color:#4f4c46;">Répondez directement à cette demande pour confirmer la prise en charge et le tarif.</div></td></tr><tr><td style="background:#111214;padding:18px 34px;color:#aaa79f;font-size:11px;letter-spacing:.5px;">VTC ARRAS HDF · 06 82 54 58 49</td></tr></table></td></tr></table></body></html>`;

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
        html,
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
