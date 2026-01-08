# TODO: Event Detail Pages

## TL;DR
Create individual event pages (`/events/[slug]`) and make EventCard clickable to navigate to them, replacing the RSVP button with a "View details" link.

## Requirements (User's Words)
1. "I want to create a dedicated page for each event, so when users click on the EventCard component they see the event page for this event"
2. "For the EventCard, I want the whole card to be clickable and when clicked, redirect to the /events/[event-slug] path"
3. "Remove the 'RSVP Now' button from the upcoming events"
4. "Add a less prominent text (that looks like a link or something) with text 'View details' for both upcoming and past events"
5. "For the new event page, I want it to have: a link that returns back to events list"
6. "Check this for inspiration: https://zurichjs.com/events/jan-2026"

## Facts (Code Analysis)

### Current State
- **EventCard location**: [EventCard.tsx](components/events/EventCard.tsx)
- **Events data**: Markdown files in `content/events/` parsed via [content.ts:8-51](lib/content.ts#L8-L51)
- **Event type**: Defined in [types.ts:12-25](lib/types.ts#L12-L25) - includes `slug`, `markdown` (event description)
- **Routing**: App Router (Next.js 16.1.1), static export enabled
- **Events list page**: [app/events/page.tsx](app/events/page.tsx)
- **No existing dynamic event routes** - need to create `app/events/[slug]/page.tsx`

### EventCard Current Behavior (lines 163-179)
- RSVP button only shows for upcoming events
- Card is NOT currently clickable as a whole
- Uses `Card` component with `hover` and `glowOnHover` props

### Existing Patterns
- `getEventBySlug(slug)` function already exists at [content.ts:48-51](lib/content.ts#L48-L51)
- `getAllEvents()` exists for generating static params
- Markdown content is already parsed and available via `event.markdown`

### ZurichJS Inspiration (from web fetch)
- "Back to all events" link at top of content area
- Event title, status, date, time, venue
- Event description with detailed agenda
- RSVP button for external Meetup link
- Speaker information
- Map embed for venue

## User Made Decisions
- Card should redirect to `/events/[event-slug]` path
- "View details" text instead of RSVP button
- Back link to events list on detail page

## Implied Decisions
1. Event detail page needs `generateStaticParams` for static export
2. Markdown content needs to be rendered as HTML on the detail page
3. The RSVP link should still be accessible somewhere on the detail page (since it's removed from the card)

## Decisions Made

### Decision 1: Event Page Layout
**Chosen: Option A - Top-left back link**
- Back link positioned at top-left, before the title
- Follows ZurichJS pattern

### Decision 2: Event Detail Page Content
**Chosen: Option A - Comprehensive layout**
- Back link, title + status badge, date/time/location, image, description, speakers, RSVP button, tags

### Decision 3: "View details" Link Styling
**Chosen: Option A - Subtle link text**
- Text styled like a link with arrow icon
- Yellow color, underline on hover
- Positioned at bottom of card

### Decision 4: Card Click Implementation
**Chosen: Option A - Wrap card content in Link**
- Wrap the entire card content in Next.js Link
- Semantic and clean implementation

## Plan

### Phase 1: Create Event Detail Page
1. Create `app/events/[slug]/page.tsx` with:
   - `generateStaticParams()` for static export
   - Server component that fetches event by slug
   - 404 handling via `notFound()`
2. Create event detail UI component with:
   - Back to events link
   - Event header (title, status badge, date/time/location)
   - Event image (optional)
   - Markdown description rendered
   - Speakers section
   - RSVP button (upcoming only)
   - Tags

### Phase 2: Update EventCard Component
1. Make entire card clickable with Link wrapper
2. Remove RSVP button section
3. Add "View details" link at bottom
4. Ensure proper hover states work with Link

## Testing Requirements
- [ ] Navigate to `/events/[slug]` and verify page renders
- [ ] Click on EventCard and verify navigation works
- [ ] Verify "View details" appears on both upcoming and past events
- [ ] Verify back link on detail page navigates to `/events`
- [ ] Test with events that have/don't have images
- [ ] Test with events that have/don't have speakers
- [ ] Verify static export works (`npm run build`)
- [ ] Test dark mode on detail page

## Documentation Updates Required
- None identified
