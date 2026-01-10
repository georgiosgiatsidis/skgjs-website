# TODO: Mobile View Fixes

## TL;DR
Fix three mobile view issues: add background color and top padding to mobile menu, increase horizontal padding on main content, and reduce page header font sizes for small viewports.

## Requirements (User's Words)
> - Mobile menu
>   - Needs to have a background color
>   - It needs a top padding because the menu items are stuck at the top
>
> - The main view needs more horizontal padding because now, sections seem to reach the left and right of the viewport
>
> - Pages headers have relatively big font size and get wrapped in small viewports, we need to decrease the font size of pages headers

## Facts (Current Codebase Analysis)

### 1. Mobile Menu (`components/layout/Header.tsx`)
- **Current state**: Lines 218-291
  - Background: Uses `bg-js-black` at 98% opacity (line 228-232)
  - Menu content container has `px-8` horizontal padding (line 235)
  - **No top padding** - items are vertically centered (`justify-center`) but no explicit top padding
  - Menu items are in a `flex flex-col items-center justify-center` layout
  - The menu has decorative blur elements but the main content starts from center

**Issue**: The mobile menu does have a dark background (`bg-js-black` with opacity 0.98), but the user says "needs to have a background color" - possibly referring to the menu nav container itself not having explicit background, or the background is not visible enough.

### 2. Container Horizontal Padding (`components/layout/Container.tsx`)
- **Current state**: Line 14
  - Mobile: `px-4` (16px)
  - Small (640px+): `sm:px-6` (24px)
  - Large (1024px+): `lg:px-8` (32px)

**Issue**: 16px padding on mobile may not be enough for some content.

### 3. Page Headers (AnimatedText component used in pages)
- **About Us page** (line 88-95): `text-5xl font-black ... md:text-6xl lg:text-7xl`
- **Events page** (line 28-35): `text-5xl font-black ... md:text-6xl lg:text-7xl`

**Current responsive scale**:
- Mobile: `text-5xl` = 3rem (48px)
- md (768px+): `text-6xl` = 3.75rem (60px)
- lg (1024px+): `text-7xl` = 4.5rem (72px)

**Issue**: 48px on mobile may be too large for short viewport widths, causing wrapping.

## User Made Decisions

### Decision 1: Mobile Menu Background → **A**
Add solid `bg-js-black` directly to the nav element inside the mobile menu.

### Decision 2: Mobile Menu Top Padding → **A**
Add `pt-20` (80px) to account for header height + extra breathing room.

### Decision 3: Container Horizontal Padding → **A**
Increase to `px-6` (24px) on mobile, keep rest unchanged.

### Decision 4: Page Header Font Size → **A**
Use `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` for progressive scaling.

## Plan

1. **Mobile Menu Background & Padding** (`Header.tsx`)
   - Address background color concern (likely increase opacity or add solid bg)
   - Add top padding to the menu content container

2. **Container Padding** (`Container.tsx`)
   - Increase mobile horizontal padding from `px-4` to `px-6`

3. **Page Header Font Sizes** (Multiple pages)
   - Update AnimatedText className in:
     - `app/about-us/page.tsx`
     - `app/events/page.tsx`
     - `app/community/page.tsx`
     - `app/contact/page.tsx`
     - Any other pages with similar headers

## Testing Requirements
- Test on various mobile viewport widths (320px, 375px, 414px)
- Test mobile menu open/close behavior
- Verify header text doesn't wrap awkwardly on small screens
- Check that increased padding doesn't break any layouts

## Documentation Updates
- None required (CSS/styling changes only)
