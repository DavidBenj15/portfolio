import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  className,
  children,
  fullHeight = true,
  padding = 'lg',
  container = true,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-8 sm:px-6 sm:py-12',
    md: 'px-6 py-12 sm:px-8 sm:py-16',
    lg: 'px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24',
    xl: 'px-12 py-20 sm:px-16 sm:py-24 lg:px-20 lg:py-32',
  };

  const sectionClasses = cn(
    'relative w-full',
    fullHeight && 'min-h-screen',
    paddingClasses[padding],
    className
  );

  const content = container ? (
    <div className="mx-auto max-w-7xl w-full">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section id={id} className={sectionClasses}>
      {content}
    </section>
  );
};

export default Section; 