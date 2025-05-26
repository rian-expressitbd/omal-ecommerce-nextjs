// components/Breadcrumb.tsx
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-primary">
        Home
      </Link>
      {paths.map((segment, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        
        return (
          <span key={segment} className="flex items-center">
            <span className="mx-2">/</span>
            {isLast ? (
              <span className="text-primary font-medium">{segment}</span>
            ) : (
              <Link href={href} className="hover:text-primary capitalize">
                {segment.replace(/-/g, ' ')}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}