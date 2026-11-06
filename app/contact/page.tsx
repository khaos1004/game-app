import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import CopyText from "@/components/CopyText";
import { site } from "@/lib/data";
import "../account.css";

export const metadata: Metadata = {
  title: "문의하기",
  description: "협업, 퍼블리싱, 게임 관련 문의를 남겨 주세요. JCodeLab이 빠르게 답변 드립니다.",
};

export default function ContactPage() {
  return (
    <main className="page-pad">
      <div className="wrap contact">
        <div className="contact__intro">
          <p className="eyebrow">Contact</p>
          <h1 className="display contact__title">
            Tell us
            <br />
            your idea.
          </h1>
          <p className="lede">협업, 퍼블리싱, 버그 제보, 게임에 대한 피드백 무엇이든 남겨 주세요. 빠르게 답변 드리겠습니다.</p>
          <dl className="contact__facts">
            <div>
              <dt>이메일</dt>
              <dd>
                <CopyText text={site.email} label="이메일" />
              </dd>
            </div>
            <div>
              <dt>전화</dt>
              <dd>
                <CopyText text={site.phone} label="전화번호" />
              </dd>
            </div>
            <div>
              <dt>응대 시간</dt>
              <dd>{site.phoneHours}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
