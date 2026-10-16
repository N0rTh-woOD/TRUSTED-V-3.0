import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { HOME_MODULES } from "@/data/homepage";
import { HomepageImage } from "./HomepageImage";
import { HomeBulletList, HomeSectionHeading } from "./HomeSectionHeading";

const ModuleVisual = ({ index }) => {
  const previous = HOME_MODULES[(index + HOME_MODULES.length - 1) % HOME_MODULES.length];
  const next = HOME_MODULES[(index + 1) % HOME_MODULES.length];
  const active = HOME_MODULES[index];
  return (
    <div className="home-module-visual" data-testid={`module-${active.id}-visual`}>
      <HomepageImage name={previous.image} decorative className="home-module-neighbor home-module-before" sizes="20vw" data-testid={`module-${active.id}-previous-image`} />
      <HomepageImage name={next.image} decorative className="home-module-neighbor home-module-after" sizes="20vw" data-testid={`module-${active.id}-next-image`} />
      <div className="home-module-main-image">
        <HomepageImage name={active.image} alt={active.alt} data-testid={`module-${active.id}-image`} />
      </div>
    </div>
  );
};

export const ProductShowcase = () => {
  const [selected, setSelected] = useState("software");
  const activeIndex = HOME_MODULES.findIndex((module) => module.id === selected);
  const move = (direction) => setSelected(HOME_MODULES[(activeIndex + direction + HOME_MODULES.length) % HOME_MODULES.length].id);
  return (
    <section className="tv-section home-products" data-testid="product-families" aria-labelledby="product-families-heading">
      <div className="tv-container">
        <HomeSectionHeading id="product-families" eyebrow="Product families" action={<Link to="/product-suite" className="tv-arrow-link" data-testid="product-families-full-suite">See the full suite<ArrowUpRight size={17} aria-hidden="true" /></Link>}>
          Four modules. One RISC-V platform.
        </HomeSectionHeading>
        <Tabs value={selected} onValueChange={setSelected} data-testid="product-families-showcase">
          <TabsList className="home-module-tabs" aria-label="Platform modules" data-testid="module-tabs">
            {HOME_MODULES.map((module) => <TabsTrigger value={module.id} key={module.id} className="home-module-tab" data-testid={`module-tab-${module.id}`}><span>{module.number}</span>{module.title}</TabsTrigger>)}
          </TabsList>
          {HOME_MODULES.map((module, index) => (
            <TabsContent value={module.id} key={module.id} className="home-module-panel" data-testid={`module-panel-${module.id}`}>
              <ModuleVisual index={index} />
              <div className="home-module-copy">
                <span className="home-category" data-testid={`module-${module.id}-number`}>Module {module.number}</span>
                <h3 data-testid={`module-${module.id}-title`}>{module.title}</h3>
                <p data-testid={`module-${module.id}-description`}>{module.description}</p>
                <HomeBulletList items={module.bullets} id={`module-${module.id}`} />
                <Link to={module.to} className="tv-arrow-link" data-testid={`module-${module.id}-link`}>Explore {module.title}<ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </TabsContent>
          ))}
          <div className="home-module-controls">
            <span className="home-carousel-count" aria-live="polite" aria-atomic="true" data-testid="module-showcase-counter"><span className="sr-only">Module </span>{HOME_MODULES[activeIndex].number}<span className="home-count-total"> / 04</span></span>
            <div className="home-carousel-arrows">
              <Button variant="outline" size="icon" className="home-carousel-button" onClick={() => move(-1)} aria-label="Previous module" title="Previous module" data-testid="module-prev"><ArrowLeft size={18} /></Button>
              <Button variant="outline" size="icon" className="home-carousel-button" onClick={() => move(1)} aria-label="Next module" title="Next module" data-testid="module-next"><ArrowRight size={18} /></Button>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};