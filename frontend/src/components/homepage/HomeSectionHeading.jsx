import { Eyebrow } from "@/components/ui-kit";

export const HomeSectionHeading = ({ id, eyebrow, children, intro, action }) => (
  <div className="home-section-heading">
    <div>
      <Eyebrow data-testid={`${id}-eyebrow`}>{eyebrow}</Eyebrow>
      <h2 id={`${id}-heading`} className="tv-h2" data-testid={`${id}-title`}>{children}</h2>
      {intro && <p className="tv-lede" data-testid={`${id}-intro`}>{intro}</p>}
    </div>
    {action}
  </div>
);

export const HomeBulletList = ({ items, id }) => (
  <ul className="home-bullets" data-testid={`${id}-bullets`}>
    {items.map((item, index) => <li key={item} data-testid={`${id}-bullet-${index + 1}`}>{item}</li>)}
  </ul>
);