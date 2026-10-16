import images from "@/data/homepage-images.json";

export const HomepageImage = ({ name, alt, className = "", sizes = "(min-width: 1024px) 42vw, 100vw", decorative = false, ...props }) => {
  const image = images[name];
  return (
    <img
      src={`/images/homepage/${name}-1200.webp`}
      srcSet={`/images/homepage/${name}-640.webp 640w, /images/homepage/${name}-1200.webp 1200w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`home-image ${className}`}
      {...props}
    />
  );
};