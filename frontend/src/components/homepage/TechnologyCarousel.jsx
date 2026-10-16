import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { HOME_TECHNOLOGIES } from "@/data/homepage";
import { HomepageImage } from "./HomepageImage";
import { HomeSectionHeading } from "./HomeSectionHeading";

export const TechnologyCarousel = () => {
  const [api, setApi] = useState();
  const [visible, setVisible] = useState([0]);
  const [position, setPosition] = useState({ current: 0, total: 1 });
  useEffect(() => {
    if (!api) return;
    const update = () => {
      setVisible(api.slidesInView());
      setPosition({ current: api.selectedScrollSnap(), total: api.scrollSnapList().length });
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => api.reInit({ duration: motion.matches ? 0 : 25 });
    api.on("select", update).on("reInit", update).on("slidesInView", update);
    motion.addEventListener("change", updateMotion);
    updateMotion();
    update();
    return () => {
      api.off("select", update).off("reInit", update).off("slidesInView", update);
      motion.removeEventListener("change", updateMotion);
    };
  }, [api]);
  const first = visible.length ? Math.min(...visible) + 1 : 1;
  const last = visible.length ? Math.max(...visible) + 1 : 1;
  return (
    <section className="tv-section home-technologies" data-testid="core-technologies" aria-labelledby="core-technologies-heading">
      <div className="tv-container">
        <HomeSectionHeading id="core-technologies" eyebrow="Core technologies">What the platform is made of.</HomeSectionHeading>
        <Carousel opts={{ align: "start", loop: false, slidesToScroll: 1, inViewThreshold: 0.5 }} setApi={setApi} tabIndex={0} aria-label="Core technologies" className="home-tech-carousel" data-testid="core-technologies-carousel">
          <CarouselContent data-testid="technology-carousel-track">
            {HOME_TECHNOLOGIES.map((tech, index) => (
              <CarouselItem key={tech.id} className="md:basis-1/2 lg:basis-1/3" aria-label={`${index + 1} of ${HOME_TECHNOLOGIES.length}`} aria-hidden={!visible.includes(index)} data-testid={`technology-slide-${tech.id}`}>
                <Link to={tech.to} tabIndex={visible.includes(index) ? 0 : -1} className="tv-panel home-tech-card" data-testid={`core-tech-${tech.id}`}>
                  <div className="home-tech-image"><HomepageImage name={tech.image} alt={tech.alt} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" data-testid={`technology-${tech.id}-image`} /></div>
                  <div className="home-tech-copy">
                    <span className="home-category" data-testid={`technology-${tech.id}-category`}>{tech.category}</span>
                    <div className="home-tech-title"><h3 data-testid={`technology-${tech.id}-title`}>{tech.title}</h3><ArrowUpRight size={18} aria-hidden="true" /></div>
                    <p data-testid={`technology-${tech.id}-description`}>{tech.description}</p>
                    {tech.status && <span className="home-tech-status" data-testid="technology-tooling-status">{tech.status}</span>}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="home-carousel-controls">
            <span className="home-carousel-count" aria-live="polite" aria-atomic="true" data-testid="technology-carousel-counter">
              <span className="sr-only">Showing technologies </span>{String(first).padStart(2, "0")}–{String(last).padStart(2, "0")} <span className="home-count-total">/ 06</span>
            </span>
            <div className="home-carousel-progress" aria-hidden="true" data-testid="technology-carousel-progress"><span style={{ width: `${((position.current + 1) / position.total) * 100}%` }} /></div>
            <div className="home-carousel-arrows">
              <CarouselPrevious title="Previous technology" className="home-carousel-button" data-testid="carousel-btn-prev" />
              <CarouselNext title="Next technology" className="home-carousel-button" data-testid="carousel-btn-next" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};