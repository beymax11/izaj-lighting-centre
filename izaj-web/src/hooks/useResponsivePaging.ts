import { useEffect, useState } from 'react';

export const useResponsivePaging = (breakpoints: { mobile: number; tablet: number; desktop: number }) => {
  const [productsPerPage, setProductsPerPage] = useState(breakpoints.desktop);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const mobile = width <= 640;
      const tablet = width > 640 && width <= 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
      setProductsPerPage(mobile ? breakpoints.mobile : tablet ? breakpoints.tablet : breakpoints.desktop);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [breakpoints.desktop, breakpoints.mobile, breakpoints.tablet]);

  return { productsPerPage, isMobile, isTablet };
};


