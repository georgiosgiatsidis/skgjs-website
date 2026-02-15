# TODO: Centralize Stats Calculation

## TL;DR
Centralize the community stats (Meetups, Members, Founded, Organizers, Speakers) currently duplicated across 3 files into a single source of truth.

## Requirements
> "I want to centralize the calculation of stats used in 3 places: app/about-us/page.tsx, app/community/page.tsx and components/home/Hero.tsx."
> "For the 'Meetups' value, we can count the number of files contained in content/events/*"
> "For 'Founded', 'Members' number lets keep it somewhere hardcoded (in a config file or something)"
> "For 'Organizers' and 'Speakers' number, lets keep the calculation made in app/community/page.tsx"
> "Let's replace the 'Years' stat, mentioned in components/home/Hero.tsx with 'Founded'"

## Facts

### Current state of stats across the 3 files:

| Stat       | Hero.tsx (L10-15)        | about-us/page.tsx (L108-113) | community/page.tsx (L51-56) |
|------------|--------------------------|------------------------------|-----------------------------|
| Meetups    | `5+` (hardcoded)         | `5+` (hardcoded)             | `5+` (hardcoded)            |
| Members    | `300+` (hardcoded)       | `380+` (hardcoded)           | `380+` (hardcoded)          |
| Speakers   | `10+` (hardcoded)        | `10+` (hardcoded)            | `speakers.length` (calculated) |
| Organizers | —                        | —                            | `organizers.length` (calculated) |
| Founded    | —                        | `2024` (hardcoded)           | —                           |
| Years      | `1+` (hardcoded)         | —                            | —                           |

### Inconsistencies found:
- Members: Hero says 300+, the other two say 380+
- Speakers: Hero and about-us hardcode 10+, community calculates dynamically
- Meetups: All hardcode 5+, but `content/events/` has **8 files**

### Key constraint:
- `Hero.tsx` is a **`'use client'` component** (uses framer-motion). It cannot call server-side fs functions directly. Stats must be passed as **props**.
- `about-us/page.tsx` and `community/page.tsx` are **server components** — they can call the stats function directly.

### Existing patterns:
- `lib/content.ts` already has `getAllEvents()`, `getAllCommunityMembers()`, `getSiteConfig()` — server-side fs-based functions
- No existing config file for hardcoded values beyond `content/site-config.md`

## User Made Decisions
1. Meetups = count of files in `content/events/`
2. Founded & Members = hardcoded in a config
3. Organizers & Speakers = calculated from community members (keep existing logic)
4. Replace "Years" with "Founded" in Hero

## Decided

### 1. Where to store hardcoded values (Founded, Members)?

**A) In `lib/stats.ts` as constants (Recommended)**
- Pros: Simple, co-located with the stats logic, easy to find and update
- Cons: Mixing config with logic

**B) In `content/site-config.md` frontmatter**
- Pros: Follows existing content pattern, non-devs could edit it
- Cons: Requires parsing markdown just for two numbers, site-config already serves a different purpose

**C) In a new `config/community.ts` file**
- Pros: Clean separation of config from logic
- Cons: Another file/folder to maintain for just two values

My recommendation: **Option A** — keep it simple. A `lib/stats.ts` file with constants at the top + the `getStats()` function is the most pragmatic approach. Easy to find, easy to change.

### 2. What stats should each page display?

Currently each page shows a different subset. Should we standardize?

**A) Keep current subsets per page (Recommended)**
- Hero: Meetups, Members, Speakers, Founded (replacing Years)
- About Us: Founded, Members, Meetups, Speakers
- Community: Members, Organizers, Speakers, Meetups

**B) Show all 5 stats everywhere**
- Could be too many for some layouts

My recommendation: **Option A** — each page picks what's relevant from the centralized source.

### 3. Suffix handling for "Founded"

Currently in about-us, `Founded` has value `2024` with no suffix. In Hero, `Years` had suffix `+`. Since we're replacing Years with Founded:

**A) Show Founded as plain number (e.g., `2024`) — no suffix (Recommended)**
- Consistent with about-us page

**B) Show Founded with some suffix**
- Doesn't make semantic sense for a year

My recommendation: **Option A**.

## Plan

1. Create `lib/stats.ts` with:
   - Hardcoded constants for `FOUNDED_YEAR` and `MEMBERS_COUNT`
   - A `getStats()` function that returns all stats (Meetups from file count, Members/Founded from constants, Organizers/Speakers from `getAllCommunityMembers()`)
2. Update `app/about-us/page.tsx` to use `getStats()`
3. Update `app/community/page.tsx` to use `getStats()`
4. Update `components/home/Hero.tsx`:
   - Accept stats as props
   - Replace "Years" with "Founded"
5. Update the page that renders Hero (likely `app/page.tsx`) to call `getStats()` and pass stats as props

## Testing Requirements
- Verify all 3 pages render correct stats
- Verify Meetups count matches number of event files (currently 8)
- Verify Hero shows "Founded" instead of "Years"
- Verify no build errors (type checking)

## Documentation Updates
- None required
