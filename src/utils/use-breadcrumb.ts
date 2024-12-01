'use client';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function convertBreadcrumbTitle(string: string) {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toLowerCase();
}

export default function useBreadcrumb() {
  const pathname = useLocation().pathname; // Access the current location
 
  const [breadcrumbs, setBreadcrumbs] = useState<any>(null);
  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/');

      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  return breadcrumbs;
}
