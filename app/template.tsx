/** 페이지를 옮길 때마다 새 페이지가 부드럽게 떠오르도록 감싸는 템플릿 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
