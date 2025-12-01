import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";

export const dynamic = "force-dynamic";

// ================= GOOGLE SHEET AUTH ================= //
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"), // required
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, auth);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

// ================= API ================= //
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const submissionDate = new Date().toLocaleString("en-IN");

    // Email Admin
    await transporter.sendMail({
      from: `"Vipas Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `📩 New Inquiry from ${data.name}`,
      html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    <p><strong>Plan of Future:</strong> ${data.planOfFuture}</p>
    <p><strong>Career Path:</strong> ${data.careerPath}</p>
    <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
    <p><strong>Submission Time:</strong> ${submissionDate}</p>
  `,
    });

    // Email User
    await transporter.sendMail({
      from: `"Vipas Academy" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Thanks for Contacting Vipas Academy 🎓",
      html: `
    <h2>Dear ${data.name},</h2>
    <p>We received your details & will contact you soon</p>

    <h3>📄 Your Submitted Details</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    <p><strong>Plan of Future:</strong> ${data.planOfFuture}</p>
    <p><strong>Career Path:</strong> ${data.careerPath}</p>

    <br/>
    <p>We are excited to help you build a successful future! 🚀</p>
    <p>Best regards, <br><strong>Team Vipas Academy</strong></p>
  `,
    });

    // Save to Sheet (CORRECT FIELD MATCHING 🟢)
    await doc.loadInfo();
    await doc.sheetsByIndex[0].addRow({
      Name: data.name,
      Contact: data.contact,
      Email: data.email,
      Education: data.education,
      "Plan of Future": data.planOfFuture, // FIXED 🔥
      "Career Path": data.careerPath ?? "N/A",
      "Inquiry Type": data.inquiryType,
      Date: submissionDate,
    });

    console.log("🟢 SHEET UPDATED SUCCESSFULLY");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("❌ ERROR:", err);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
