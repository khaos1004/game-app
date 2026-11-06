// Cloudflare Worker: 정적 사이트(out/)를 그대로 내보내고, /api/contact 로 온 문의만 메일로 보냅니다.
// 메일은 Cloudflare Email Routing(send_email 바인딩)으로 보내며, 받는 주소는 wrangler.jsonc 에서 정합니다.
import { EmailMessage } from "cloudflare:email";

type SendEmail = { send(message: EmailMessage): Promise<void> };

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  MAILER: SendEmail;
  CONTACT_TO: string; // 문의를 받을 주소 (Email Routing에서 인증한 주소)
  CONTACT_FROM: string; // 보내는 주소 (jcodelab.cloud 도메인 주소)
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, max);

const oneLine = (s: string) => s.replace(/[\n\t]+/g, " ");

const isEmail = (s: string) => /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(s);

/** UTF-8 문자열을 base64로 */
function b64(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** 한글 헤더(제목·이름)용 인코딩 */
const word = (s: string) => `=?UTF-8?B?${b64(s)}?=`;

function buildMime(o: { from: string; fromName: string; to: string; replyTo: string; subject: string; text: string }) {
  const domain = o.from.split("@")[1] || "jcodelab.cloud";
  const body = b64(o.text).replace(/.{1,76}/g, "$&\r\n");
  return [
    `From: ${word(o.fromName)} <${o.from}>`,
    `To: <${o.to}>`,
    `Reply-To: <${o.replyTo}>`,
    `Subject: ${word(o.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    body,
  ].join("\r\n");
}

async function handleContact(request: Request, env: Env) {
  if (request.method !== "POST") return json({ message: "POST만 받을 수 있습니다." }, 405);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ message: "요청 형식이 올바르지 않습니다." }, 400);
  }

  // 스팸 봇이 채우는 숨은 칸
  if (clean(data.website, 200)) return json({ ok: true });

  const name = oneLine(clean(data.name, 60));
  const email = oneLine(clean(data.email, 120));
  const title = oneLine(clean(data.title, 120));
  const content = clean(data.content, 5000);

  if (!name || !isEmail(email) || !title || content.length < 10)
    return json({ message: "입력한 내용을 다시 확인해 주세요." }, 400);

  const text = [
    "JCodeLab 홈페이지 문의가 도착했습니다.",
    "",
    `보낸 사람: ${name} <${email}>`,
    `제목: ${title}`,
    "",
    content,
    "",
    "—",
    "이 메일에 답장하면 문의하신 분께 바로 전달됩니다.",
  ].join("\n");

  try {
    const raw = buildMime({
      from: env.CONTACT_FROM,
      fromName: "JCodeLab 문의",
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `[JCodeLab 문의] ${title}`,
      text,
    });
    await env.MAILER.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
    return json({ ok: true });
  } catch (err) {
    console.error("contact mail failed", err);
    return json({ message: "메일을 보내지 못했습니다." }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
