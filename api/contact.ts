type Request = { method?: string; body?: Record<string, unknown> | string };
type Response = { status: (code: number) => Response; json: (body: Record<string, unknown>) => void; setHeader: (name: string, value: string) => void };

const safeText = (value: unknown, max = 4000) => String(value ?? "").trim().slice(0, max);
const html = (value: string) => value.replace(/[&<>"']/g, (ch) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[ch] ?? ch));

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  let body: Record<string, unknown> = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ error: "Invalid request body." });
  }

  // Honeypot: silently accept automated submissions without sending email.
  if (safeText(body.company_website, 300)) return res.status(200).json({ ok: true });

  const isQuickForm = body.form_type === "quick";
  const name = safeText(body.name, 120);
  const email = safeText(body.email, 254);
  const company = safeText(body.company, 180);
  const website = safeText(body.website, 500);
  const need = safeText(body.need, 180);
  const platforms = safeText(body.platforms, 1200);
  const problem = safeText(body.problem, 4000);
  const urgency = safeText(body.urgency, 80);
  const budget = safeText(body.budget, 80);

  if (!name || !problem || body.consent !== "yes" || (!isQuickForm && (!company || !website || !need))) {
    return res.status(400).json({ error: "Complete the required fields and accept the contact consent." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid work email address." });
  }

  let parsedWebsite: URL | undefined;
  if (website) {
    try {
      parsedWebsite = new URL(website);
    } catch {
      return res.status(400).json({ error: "Enter a valid website URL, including https://." });
    }
    if (!["http:", "https:"].includes(parsedWebsite.protocol)) {
      return res.status(400).json({ error: "Website URL must use http or https." });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "The enquiry service is not configured yet. Please email hello@fixifydata.xyz." });
  }

  const to = process.env.CONTACT_TO || "hello@fixifydata.xyz";
  const from = process.env.CONTACT_FROM || "Fixify Website <no-reply@fixifydata.xyz>";
  const textBody = [
    "New Fixify tracking enquiry", "",
    `Name: ${name}`, `Work email: ${email}`, `Company: ${company}`,
    `Website: ${parsedWebsite?.href || "Not provided"}`, `Need: ${need || "Not specified"}`,
    `Platforms: ${platforms || "Not specified"}`,
    `Urgency: ${urgency || "Not specified"}`, `Budget: ${budget || "Not specified"}`, "",
    "What is going wrong:", problem,
  ].join("\n");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: email, subject: `Fixify enquiry: ${need}`,
        text: textBody,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6">${textBody.split("\n").map(html).join("<br/>")}</div>`,
      }),
    });
    if (!delivery.ok) {
      const detail = await delivery.text().catch(() => "");
      console.error("Resend delivery failed", delivery.status, detail.slice(0, 500));
      return res.status(502).json({ error: "The email service could not deliver the request. Please email hello@fixifydata.xyz." });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact handler failed", error);
    return res.status(502).json({ error: "The email service is temporarily unavailable. Please email hello@fixifydata.xyz." });
  }
}
