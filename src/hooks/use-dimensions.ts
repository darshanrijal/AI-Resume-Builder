import * as React from "react";

export function useDimensions(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const currentRef = containerRef.current;

    function getDimensions(): typeof dimensions {
      return {
        width: currentRef?.offsetWidth ?? 0,
        height: currentRef?.offsetHeight ?? 0,
      };
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions(getDimensions());
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
      setDimensions(getDimensions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
}
