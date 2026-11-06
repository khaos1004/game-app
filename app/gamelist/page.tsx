import type { Metadata } from "next";
import Store from "@/components/store/Store";
import "./store.css";

export const metadata: Metadata = {
  title: "게임",
  description: "JCodeLab이 Unity로 만드는 모바일 게임을 만나 보세요.",
};

export default function GameListPage() {
  return <Store />;
}
