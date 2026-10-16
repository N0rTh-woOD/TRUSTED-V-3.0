import { HOME_MARKETS } from "@/data/homepage";
import { HomepageImage } from "./HomepageImage";
import { HomeBulletList, HomeSectionHeading } from "./HomeSectionHeading";

export const ApplicationMarkets = () => (
  <section className="tv-section home-markets" data-testid="application-markets" aria-labelledby="application-markets-heading">
    <div className="tv-container">
      <HomeSectionHeading id="application-markets" eyebrow="Application markets">Where TRUSTED-V ships.</HomeSectionHeading>
      <div className="home-market-grid">
        {HOME_MARKETS.map((market) => (
          <article key={market.id} className="tv-panel home-market" data-testid={`market-card-${market.id}`}>
            <div className="home-market-image">
              <HomepageImage name={market.image} alt={market.alt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" data-testid={`market-${market.id}-image`} />
            </div>
            <div className="home-market-copy">
              <span className="home-category" data-testid={`market-${market.id}-category`}>{market.label}</span>
              <h3 data-testid={`market-${market.id}-title`}>{market.title}</h3>
              <HomeBulletList items={market.capabilities} id={`market-${market.id}`} />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);