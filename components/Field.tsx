import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import Icon, { type IconName } from "./Icon";

type Base = { id: string; label: string; icon: IconName; hint?: string; error?: string };

export function Field({ id, label, icon, hint, error, ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`field${error ? " is-invalid" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {hint && <small>{hint}</small>}
      </label>
      <div className="field__box">
        <Icon name={icon} size={18} />
        <input id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...input} />
      </div>
      {error && (
        <p id={`${id}-err`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}

export function AreaField({ id, label, icon, hint, error, ...area }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={`field${error ? " is-invalid" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {hint && <small>{hint}</small>}
      </label>
      <div className="field__box field__box--area">
        <Icon name={icon} size={18} />
        <textarea id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...area} />
      </div>
      {error && (
        <p id={`${id}-err`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
