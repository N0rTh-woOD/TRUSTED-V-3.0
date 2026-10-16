import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { HOME_FEATURES } from "@/data/homepage";
import { HomepageImage } from "./HomepageImage";
import { HomeBulletList, HomeSectionHeading } from "./HomeSectionHeading";

const FeatureSection = ({ feature }) => (
  <section className={`tv-section home-feature home-feature-${feature.image}`} data-testid={feature.id} aria-labelledby={`${feature.id}-heading`}>
    <div className="tv-container">
      <HomeSectionHeading id={feature.id} eyebrow={feature.eyebrow} intro={feature.intro}>
        {feature.heading} <span className="text-[#003262]">{feature.highlight}</span>
      </HomeSectionHeading>
      <div className="home-feature-layout" data-testid={`${feature.id}-content`}>
        <div className="home-feature-copy">
          <h3 data-testid={`${feature.id}-feature-title`}>{feature.title}</h3>
          <p data-testid={`${feature.id}-description`}>{feature.description}</p>
          <HomeBulletList items={feature.bullets} id={feature.id} />
          <Link to={feature.to} className="tv-arrow-link home-feature-link" data-testid={feature.linkId}>
            {feature.cta}<ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="home-feature-visual">
          <HomepageImage name={feature.image} alt={feature.alt} data-testid={`${feature.id}-image`} />
        </div>
      </div>
    </div>
  </section>
);

export const AIEnginesPreview = () => <FeatureSection feature={HOME_FEATURES[0]} />;
export const RiscVIPCollaboration = () => <FeatureSection feature={HOME_FEATURES[1]} />;