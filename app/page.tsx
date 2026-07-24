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
import { BackToTop } from "./components/BackToTop";
import { getPublicMasterclasses } from "./lib/masterclasses";

export default async function Home() {
  const masterclasses = await getPublicMasterclasses();

  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedByMarquee />
      <Masterclasses masterclasses={masterclasses} />
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