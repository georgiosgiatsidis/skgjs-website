# TODO: Dynamic Event Status Calculation

## TL;DR
Change event status (upcoming/past) from a static frontmatter property to dynamic calculation based on comparing event `date` with the current date at runtime.

## Requirements
User's verbatim request:
> "I want to change the calculation of past and upcoming events. In more detail, I'm referring to the functions "getUpcomingEvents" and "getPastEvents" which calculate the upcoming status based on the static "status" prop of each event item in content/events/ folder. This is not production ready, we need to calculate the upcoming status of each event based on the "date" value of each event, comparing it to the current date. I guess this should be calculated on the fly in a client component and not be statically generated."

## Facts (Current Implementation Analysis)

### Event Functions
- **Location:** `lib/content.ts` (lines 8-46)
- `getUpcomingEvents()` filters by `status === 'upcoming'`, sorts ascending
- `getPastEvents()` filters by `status === 'past'`, sorts descending
- `getNextEvent()` returns first upcoming event

### Status Property Usage
- **Event type:** `lib/types.ts:12-25` - `status: 'upcoming' | 'past'` is required
- **Zod schema:** `lib/schemas.ts:16-27` - validates `z.enum(['upcoming', 'past'])`
- **Content files:** All 6 events in `content/events/` have hardcoded `status` field

### UI Components Using Status
| Component | Location | Usage |
|-----------|----------|-------|
| EventCard | `components/events/EventCard.tsx:54-59` | Badge color (green/gray) |
| EventPage | `app/events/[slug]/page.tsx:87-92` | Header badge |
| EventPage | `app/events/[slug]/page.tsx:162` | RSVP button visibility |
| EventsPage | `app/events/page.tsx` | Calls both filter functions |
| Homepage | `app/page.tsx` | Calls `getNextEvent()` |

### Data Flow
```
content/events/*.md → getAllEvents() → getUpcomingEvents()/getPastEvents()
→ EventsClient → EventFilter → EventList → EventCard
```

## User Made Decisions
- Status must be calculated dynamically based on `date` field
- Calculation should happen client-side (not at build time)

## Implied Decisions
1. Remove `status` field from frontmatter (or make it optional/deprecated)
2. Remove `status` from Zod schema validation
3. Update TypeScript types
4. Update all components that check `event.status`

## Pending Decisions

### Decision 1: Status Calculation Location

**Context:** Currently events are pre-filtered on the server in `app/events/page.tsx`, then passed to `EventsClient`. The user wants client-side calculation.

**Options:**

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| **A** | Calculate in `EventsClient` component | Simple, single location for logic | All events sent to client (minor bandwidth) |
| **B** | Create a custom hook `useEventStatus()` | Reusable across components | More abstraction |
| **C** | Add computed property in a context provider | Centralized, accessible everywhere | Overkill for this use case |

**Recommendation:** Option A - Calculate in `EventsClient`. It's the simplest approach, already a client component, and the event list is small (6 events). No need for additional abstraction.

---

### Decision 2: Date Comparison Logic

**Context:** Events have a `date` field (e.g., "2026-01-20") and a `time` field (e.g., "18:30-21:00"). Need to decide what "past" means.

**Options:**

| Option | Logic | Pros | Cons |
|--------|-------|------|------|
| **A** | Compare date only (event is past if date < today) | Simple, intuitive | Event shows as "past" on the day it happens |
| **B** | Compare date + end time | Precise, event stays "upcoming" until it ends | Requires parsing time field |
| **C** | Compare date + start time | Event becomes "past" once it starts | May confuse attendees checking during event |
| **D** | Event is "past" starting the day AFTER the event date | Event stays "upcoming" on event day | Simple, best UX for day-of attendees |

**Recommendation:** Option D - An event should remain "upcoming" on the day it occurs (attendees checking the site that day should see it as upcoming). It becomes "past" starting the next day.

---

### Decision 3: What to do with the `status` field in frontmatter

**Context:** Current content files all have `status: "upcoming"` or `status: "past"` in frontmatter.

**Options:**

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| **A** | Remove `status` field entirely | Clean, no confusion | Breaking change for any external tools |
| **B** | Keep but ignore (deprecate) | Backwards compatible | Confusing, stale data |
| **C** | Make optional, use as override | Flexibility for edge cases | Added complexity |

**Recommendation:** Option A - Remove the field entirely. It's a small codebase, no external integrations, and keeping deprecated fields causes confusion.

---

### Decision 4: Handling Timezone

**Context:** Date comparison needs timezone awareness. Events are in Thessaloniki (EET/EEST, Europe/Athens).

**Options:**

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| **A** | Use user's local timezone | Works for local attendees | Inconsistent for remote viewers |
| **B** | Use fixed timezone (Europe/Athens) | Consistent for everyone | Slightly more complex code |
| **C** | Use UTC | Simple | May show wrong status near midnight |

**Recommendation:** Option B - Use Europe/Athens timezone since this is a local Thessaloniki meetup. This ensures consistent behavior regardless of where someone views the site.

---

## Plan (pending user decisions)

### Phase 1: Type & Schema Updates
1. Update `lib/types.ts` - make `status` optional or remove from Event interface
2. Update `lib/schemas.ts` - remove status from Zod validation
3. Update content files - remove `status` field from all 6 events

### Phase 2: Logic Changes
4. Update `lib/content.ts`:
   - Remove status-based filtering from `getUpcomingEvents()` and `getPastEvents()`
   - Have them return all events (sorting still applies)
   - Or: Calculate status at build time but re-calculate on client

5. Create utility function `isUpcomingEvent(date: string): boolean` in a new file or existing utils

### Phase 3: Component Updates
6. Update `EventsClient.tsx` - filter events client-side using the utility
7. Update `EventCard.tsx` - compute status from date instead of using `event.status`
8. Update `app/events/[slug]/page.tsx` - same pattern
9. Update `app/page.tsx` - update `getNextEvent()` logic

### Phase 4: Cleanup
10. Update unit tests in `tests/unit/lib/content.test.ts`
11. Remove any remaining references to `status` property

## Testing Requirements
- Unit test for `isUpcomingEvent()` function with various dates
- Test edge cases: today's date, yesterday, tomorrow
- Test timezone handling
- Verify EventCard shows correct badge
- Verify RSVP button visibility
- Verify filter toggle works correctly

## Documentation Updates Required
- None identified (no public API documentation exists)

---

## User Decisions (Confirmed)

1. **Status Calculation Location:** A - Calculate in `EventsClient` component
2. **Date Comparison Logic:** D - Event is "past" starting the day AFTER event date
3. **Status field in frontmatter:** A - Remove entirely
4. **Timezone Handling:** B - Use fixed timezone (Europe/Athens)

## Status: COMPLETED

Implementation completed successfully. TypeScript compilation passes with no errors.

### Files Modified:
- `lib/types.ts` - Removed `status` from Event interface
- `lib/schemas.ts` - Removed `status` from Zod validation
- `lib/content.ts` - Replaced `getUpcomingEvents`/`getPastEvents` with `getEventsSortedAscending`/`getEventsSortedDescending`
- `lib/event-utils.ts` - **NEW** - Created `isUpcomingEvent()` and `getEventStatus()` utilities
- `components/events/EventsClient.tsx` - Client-side filtering using `isUpcomingEvent()`
- `components/events/EventCard.tsx` - Dynamic status badge using `isUpcomingEvent()`
- `components/events/EventStatusBadge.tsx` - **NEW** - Client component for status badge
- `components/events/EventRsvpButton.tsx` - **NEW** - Client component for conditional RSVP button
- `app/events/page.tsx` - Updated to pass all events to EventsClient
- `app/events/[slug]/page.tsx` - Uses new client components for status-dependent UI
- `content/events/*.md` - Removed `status` field from all 6 event files
- `tests/unit/lib/content.test.ts` - Updated tests for new function signatures
- `tests/unit/lib/event-utils.test.ts` - **NEW** - Tests for date comparison utilities
