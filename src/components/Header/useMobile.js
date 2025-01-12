import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleScreenSize() {
      const width = window.innerWidth;
      setIsMobile(width <= 678);
    }
    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  return isMobile;
}