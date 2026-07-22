import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedByMarquee } from "./components/TrustedByMarquee";
import { Masterclasses } from "./components/Masterclasses";
import { Approach } from "./components/Approach";
import { ForWho } from "./components/ForWho";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { BackToTop } from "./components/BackToTop";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedByMarquee />
      <Masterclasses />
      <Approach />
      <ForWho />
      <About />
      <Faq />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}