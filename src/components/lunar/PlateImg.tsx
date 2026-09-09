const DIMS: Record<string, [number, number]> = {
  poster: [1600, 769],
  harbor: [1600, 900],
  walks: [1600, 900],
  hands: [1200, 1600],
  sanctum: [1600, 1066],
  nave: [1600, 900],
  door: [1600, 1066],
  folio: [1600, 900],
  morning: [1600, 900],
};

type Props = {
  name: string;
  className?: string;
  alt?: string;
  eager?: boolean;
  sizes?: string;
};

export function PlateImg({ name, className, alt = "", eager, sizes }: Props) {
  const [w, h] = DIMS[name] ?? [1600, 900];
  const layout = sizes ?? (eager ? "100vw" : "(max-width: 920px) 94vw, min(560px, 46vw)");
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/house/${name}-sm.webp 960w, /house/${name}.webp ${w}w`}
        sizes={layout}
      />
      <img
        className={className}
        src={`/house/${name}.jpg`}
        alt={alt}
        width={w}
        height={h}
        sizes={layout}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "low"}
      />
    </picture>
  );
}
