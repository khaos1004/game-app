import Image from "next/image";
import Header from "@/component/public/Header";
import Footer from "@/component/public/Footer";
import BgMainVideo from "@/component/main/BgMainVideo";
import MaskedVideo from "@/component/main/MaskedVideo";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div>
            <BgMainVideo />            
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
