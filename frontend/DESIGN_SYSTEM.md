# Design System & Component Framework

## Overview
This portfolio website uses a custom design system built with Tailwind CSS v4 and shadcn/ui components. The framework provides a consistent, reusable foundation for building beautiful, responsive web experiences.

## Design Tokens

### Colors
- **Background**: `#1E1E1E` (Dark theme)
- **Foreground**: `#FFFFFF` (Primary text)
- **Primary/Accent**: `#68ACE5` (Hopkins Blue)
- **Secondary**: `#5C5C5C` (Muted text)
- **Muted**: `#2A2A2A` (Secondary backgrounds)
- **Border**: `#3A3A3A` (Borders and dividers)

### Typography
- **Primary Font**: "Alliance No.2" (Custom font)
- **Monospace**: Geist Mono (for code snippets)
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold)

### Spacing & Layout
- **Container Max Width**: `max-w-7xl` (1280px)
- **Section Padding**: Responsive padding scales from mobile to desktop
- **Border Radius**: `0.625rem` (10px)

## Core Components

### Section Component
Full-viewport-height blocks that stack vertically and provide consistent spacing.

```tsx
import { Section } from '@/components/ui';

<Section 
  id="hero" 
  className="flex items-center justify-center"
  fullHeight={true}
  padding="lg"
  container={true}
>
  {/* Content */}
</Section>
```

**Props:**
- `id?: string` - Section identifier for navigation
- `className?: string` - Additional CSS classes
- `fullHeight?: boolean` - Whether to use full viewport height (default: true)
- `padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` - Padding size (default: 'lg')
- `container?: boolean` - Whether to wrap content in max-width container (default: true)

### Container Component
Provides consistent content width and centering.

```tsx
import { Container } from '@/components/ui';

<Container size="lg" className="text-center">
  {/* Content */}
</Container>
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Container width (default: 'lg')
- `className?: string` - Additional CSS classes

### Navigation Component
Fixed navigation bar with smooth scrolling to sections.

```tsx
import { Navigation } from '@/components/ui';

<Navigation />
```

## Usage Examples

### Basic Section Layout
```tsx
<Section id="about" className="bg-muted/50">
  <Container>
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          About Me
        </h2>
        <p className="text-lg text-muted-foreground">
          Content here...
        </p>
      </div>
    </div>
  </Container>
</Section>
```

### Responsive Grid Layout
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Grid items */}
</div>
```

### Button Styles
```tsx
// Primary button
<button className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
  Primary Action
</button>

// Secondary button
<button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
  Secondary Action
</button>
```

## Utility Classes

### Text Colors
- `text-foreground` - Primary text color
- `text-muted-foreground` - Secondary/muted text
- `text-primary` - Accent color text

### Background Colors
- `bg-background` - Main background
- `bg-muted` - Secondary background
- `bg-card` - Card background
- `bg-primary` - Accent background

### Spacing
- `px-4 sm:px-6 lg:px-8` - Responsive horizontal padding
- `py-8 sm:py-12 lg:py-16` - Responsive vertical padding
- `gap-4 sm:gap-6 lg:gap-8` - Responsive gaps

### Typography
- `text-4xl sm:text-5xl lg:text-6xl` - Responsive text sizing
- `font-bold` - Bold weight
- `font-medium` - Medium weight

## Best Practices

1. **Use Design Tokens**: Always use the predefined color variables and spacing values
2. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:) for mobile-first design
3. **Component Composition**: Combine Section and Container components for consistent layouts
4. **Accessibility**: Use semantic HTML and proper contrast ratios
5. **Performance**: Optimize images and use proper font loading strategies

## Font Setup

To use the Alliance No.2 font, place the font files in `/public/fonts/`:
- `AllianceNo2-Regular.woff2`
- `AllianceNo2-Medium.woff2`
- `AllianceNo2-Bold.woff2`

The font is automatically loaded in the layout component. 