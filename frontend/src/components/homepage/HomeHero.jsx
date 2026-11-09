import TrustedVLogo from "@/components/TrustedVLogo";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui-kit";
import { HeroAnimation } from "./HeroAnimation";
import "./HomeHero.css";

export const HomeHero = () => (
  <section className="landing-hero" data-testid="landing-hero" aria-labelledby="homepage-title">
    <div className="tv-container landing-hero-grid">
      <div className="landing-hero-copy">
        <div className="landing-hero-brand" data-testid="hero-brand-lockup">
          <TrustedVLogo size="2xl" />
        </div>
        <p className="landing-hero-eyebrow" data-testid="hero-platform-label">The complete RISC-V platform</p>
        <h1 id="homepage-title" className="landing-hero-title" data-testid="landing-hero-title">
          Secure <span>RISC-V</span>,<br />silicon to software.
        </h1>
        <p className="landing-hero-description" data-testid="landing-hero-subtitle">
          A Rust-native platform that unifies RISC-V IP, virtualization, secure boot,
          cryptography and real-time software.
        </p>
        <div className="landing-hero-actions">
          <PrimaryCTA to="/product-suite" data-testid="hero-cta-primary">Explore the platform</PrimaryCTA>
          <SecondaryCTA to="/contact" data-testid="hero-cta-secondary">Talk to our engineers</SecondaryCTA>
        </div>
      </div>
      <HeroAnimation />
    </div>
  </section>
);