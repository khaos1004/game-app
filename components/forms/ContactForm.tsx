"use client";

import { useState, type FormEvent } from "react";
import { AreaField, Field, isEmail } from "@/components/Field";

type Form = { name: string; email: string; title: string; content: string; website: string };
const empty: Form = { name: "", email: "", title: "", content: "", website: "" };

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!f.name.trim()) e.name = "이름을 입력해 주세요.";
  if (!isEmail(f.email)) e.email = "답변 받을 이메일 주소를 확인해 주세요.";
  if (!f.title.trim()) e.title = "제목을 입력해 주세요.";
  if (f.content.trim().length < 10) e.content = "문의 내용을 10자 이상 적어 주세요.";
  return e;
}

export default function ContactForm() {
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const [failMsg, setFailMsg] = useState("");

  const set = (k: keyof Form) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setF(empty);
    } catch {
      setStatus("fail");
      setFailMsg("문의를 보내지 못했습니다. 잠시 후 다시 시도하거나 이메일로 보내 주세요.");
    }
  };

  if (status === "done")
    return (
      <div className="panel panel--done" role="status">
        <p className="eyebrow">Received</p>
        <h2 className="h2">문의를 보냈습니다.</h2>
        <p className="muted">메일로 잘 전달되었습니다. 남겨 주신 이메일로 답변 드리겠습니다.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus("idle")}>
          새 문의 작성
        </button>
      </div>
    );

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <Field id="name" label="이름" icon="user" value={f.name} onChange={set("name")} autoComplete="name" error={errors.name} />
        <Field
          id="email"
          label="이메일"
          icon="mail"
          type="email"
          value={f.email}
          onChange={set("email")}
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
      </div>
      <Field id="title" label="제목" icon="edit" value={f.title} onChange={set("title")} error={errors.title} />
      <AreaField
        id="content"
        label="문의 내용"
        icon="chat"
        rows={6}
        value={f.content}
        onChange={set("content")}
        placeholder="협업 제안, 버그 제보, 피드백 등 편하게 적어 주세요."
        error={errors.content}
      />
      {/* 스팸 방지용 숨은 칸 (사람에게는 보이지 않음) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={f.website}
        onChange={set("website")}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      {status === "fail" && <p className="notice notice--err">{failMsg}</p>}
      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? "보내는 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
