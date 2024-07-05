import Footer from "@/components/common/Footer";
import ErrorMsg from "@/components/pages/Home/ErrorMsg";
import Hero from "@/components/pages/Home/Hero";
import WebsiteFunction from "@/components/pages/Home/WebsiteFunction";

export default function Home() {
  return (
    <main>
      <Hero />
      <WebsiteFunction />
      <Footer />
      <ErrorMsg />
    </main>
  );
}
