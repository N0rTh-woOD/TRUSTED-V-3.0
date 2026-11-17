import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const RetiredFeature = () => (
  <section className="min-h-[calc(100vh-76px)] bg-[#F7F7F5] text-[#0B0F14] flex items-center" data-testid="retired-feature-page">
    <div className="tv-container py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#004A7F]" data-testid="retired-feature-label">Unavailable</p>
        <h1 className="tv-h1 mt-5" data-testid="retired-feature-title">This feature is no longer available.</h1>
        <p className="tv-lede mt-6" data-testid="retired-feature-message">Explore the TRUSTED-V platform, products and services to continue your RISC-V journey.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/product-suite" className="tv-btn tv-btn-primary" data-testid="retired-feature-products-link">Explore products <ArrowUpRight className="w-4 h-4" /></Link>
          <Link to="/services" className="tv-btn tv-btn-outline" data-testid="retired-feature-services-link">View services</Link>
        </div>
      </div>
    </div>
  </section>
);

export default RetiredFeature;