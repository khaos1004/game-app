import Link from "next/link";
import "./account.css";

export default function NotFound() {
  return (
    <main className="page-pad">
      <div className="wrap page-head">
        <p className="eyebrow">404 · Level not found</p>
        <h1 className="page-head__title">찾는 페이지가 없습니다.</h1>
        <p className="lede">주소가 바뀌었거나 삭제된 페이지입니다.</p>
        <div>
          <Link href="/" className="btn btn--primary">
            메인으로 가기
          </Link>
        </div>
      </div>
    </main>
  );
}
