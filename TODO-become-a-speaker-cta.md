# TODO: Always-visible "Become a Speaker" CTA on Home Page

## TL;DR
Add a standalone "Become a Speaker" section that is always visible on the home page, placed between NextEventPreview and AboutSection. Remove the duplicate CTA from the no-event card.

## Requirements
> "I want the 'Become a Speaker' CTA to be always visible at the home page, even if there is no upcoming event. Note that in case of there is actually no upcoming event, I don't want it to be visible twice. Place it in a prominent place so that it catches the eye."

## Facts
- "Become a Speaker" CTA currently only appears in `NextEventPreview` when `event` is `null` (lines 130-168)
- When an event exists, no "Become a Speaker" CTA is shown on the home page
- The `speakerFormUrl` comes from `siteConfig` and is passed to `NextEventPreview`
- Home page section order: Hero → NextEventPreview → AboutSection → PartnersSection → CTASection
- The "Become a Speaker" CTA also exists on the events page (`EventList.tsx`) — not affected by this change

## User Made Decisions
- **Placement**: Option A — new standalone section between NextEventPreview and AboutSection

## Implied Decisions
- Remove "Become a Speaker" from the no-event card to avoid duplication
- Pass `speakerFormUrl` to the new component from `page.tsx`
- Follow existing section styling patterns (motion animations, gradient backgrounds, etc.)

## Plan
1. Create `components/home/BecomeASpeakerSection.tsx` — standalone prominent section
2. Add it to `app/page.tsx` between `NextEventPreview` and `AboutSection`
3. Remove the "Become a Speaker" CTA from the no-event card in `NextEventPreview.tsx`
4. Verify build succeeds

## Testing Requirements
- Visual: verify CTA appears when there IS an upcoming event
- Visual: verify CTA appears when there is NO upcoming event (and only once)
- Verify the link opens the speaker form URL in a new tab

## Documentation Updates
- None required
