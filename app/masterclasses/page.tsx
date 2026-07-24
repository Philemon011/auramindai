import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackToTop } from "../components/BackToTop";
import { AnimatedText, headlineContainer } from "../components/AnimatedText";
import { CatalogClient } from "./CatalogClient";
import { getPublicMasterclasses } from "../lib/masterclasses";

export default async function MasterclassesPage() {
  const masterclasses = await getPublicMasterclasses();

  return (
    <main>
      <Navbar />

      <section className="bg-background px-6 pt-40 pb-16 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="mb-4 font-body text-xs font-semibold uppercase tracking-wide text-accent">
              Programme complet
            </span>
            <h1
              className="max-w-2xl font-heading font-semibold text-foreground"
              style={{ fontSize: "48px", lineHeight: "52px", letterSpacing: "-0.02em" }}
            >
              <AnimatedText text="Toutes nos masterclasses" />
            </h1>
            <p className="mt-4 max-w-md font-body text-base text-foreground-muted">
              Trouve la session qui correspond à ton besoin, filtre par type
              ou par langue, et réserve ta place.
            </p>
          </div>

          <CatalogClient masterclasses={masterclasses} />
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}