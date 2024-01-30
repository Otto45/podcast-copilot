import { cn } from '@/lib/utils';
import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollableCardContentProps {
  children: ReactNode;
  className?: string;
}

export const ScrollableCardContent: React.FC<ScrollableCardContentProps> = ({ children, className = '' }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom of the content
    const element = contentRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [children]);

  return (
    <div ref={contentRef} className={cn("overflow-auto", className)}>
      {children}
    </div>
  );
};
