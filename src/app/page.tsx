import Image from "next/image";
import Header from "@/app/component/public/Header";
import Footer from "@/app/component/public/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">

        </main>
        <Footer />
      </div>
    </>
  );
}
