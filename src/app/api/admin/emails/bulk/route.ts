import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { emails, subject, message } = await req.json();

  try {
    const send = await resend.emails.send({
      from: "Hackathon Team <noreply@yourdomain.com>",
      to: emails,
      subject,
      html: message,
    });

    return NextResponse.json({ success: true, send });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
