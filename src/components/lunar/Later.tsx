import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mount below-fold house rooms after they are near the viewport — keeps the door and Partner first. */
export function Later({
  children,
  hashes = [],
}: {
  children: ReactNode;
  hashes?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const open = () => {
      if (done) return;
      done = true;
      setShow(true);
    };
    const here = window.location.hash.replace("#", "");
    if (here && hashes.includes(here)) {
      open();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) open();
      },
      { rootMargin: "560px 0px" },
    );
    io.observe(el);
    const t = window.setTimeout(open, 5000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [hashes]);

  return (
    <div ref={ref}>
      {show ? children : <div className="later-slot" aria-hidden="true" />}
    </div>
  );
}
