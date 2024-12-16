import { useEffect } from "react";

export function useUnloadWarning(condition = true) {
  useEffect(() => {
    if (!condition) return;

    const listner = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", listner);
    return () => window.removeEventListener("beforeunload", listner);
  }, [condition]);
}
