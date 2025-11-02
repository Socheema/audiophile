import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div 
      className={cn(
        "w-full px-6 mx-auto",
        "max-w-[375px]",
        "md:max-w-[689px]",
        "lg:max-w-[1110px]",
        "xl:max-w-[1440px]",
        className
      )}
    >
      {children}
    </div>
  );
}
