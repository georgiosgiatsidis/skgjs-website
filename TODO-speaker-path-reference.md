# TODO: Speaker Path Reference in Event Frontmatter

## TL;DR
Change event frontmatter to reference speakers by file path (pointing to community member `.md` files) instead of duplicating speaker data inline. The speaker data gets resolved at build time from the referenced file.

## Requirements
> "I want to be able to reference the speaker by the file path. For example, in content/events/2026-02-17-web3-smart-wallets.md, I would reference the speaker with name 'Evangelia Mitsopoulou', by the path:
> speaker:
>   - path: 'content/community/organizers/evangelia-mitsopoulou'"

## Facts (Current State Analysis)

### Speaker data flow
1. **Event frontmatter** defines speakers inline inside `talks[].speaker[]` with: `name`, `social.linkedin`
2. **`lib/content.ts:49-52`**: Derives `event.speakers` from `talks[].speaker[]` via `flatMap` (backward compat)
3. **`lib/types.ts:1-10`**: `Speaker` type has: `name`, `bio?`, `avatar?`, `social?: { twitter?, github?, linkedin? }`
4. **`lib/types.ts:12-17`**: `Talk.speaker` is `Speaker[]`
5. **`lib/schemas.ts:3-14`**: `SpeakerSchema` validates name, bio, avatar, social

### Files that consume speaker data (6 total)
| File | What's accessed | Lines |
|------|----------------|-------|
| `app/events/[slug]/page.tsx` | `.avatar`, `.name`, `.bio`, `.social.github/twitter/linkedin` | 212-253 (talks), 306-393 (sidebar) |
| `components/events/EventCard.tsx` | `.avatar`, `.name` | 114-162 |
| `components/events/EventCardWide.tsx` | `.avatar`, `.name`, `.bio` | 149-185 |
| `components/home/NextEventPreview.tsx` | `.name` | 381-407 |

### Community member files available
| Speaker (from events) | Has community file? | Path |
|----------------------|---------------------|------|
| Evangelia Mitsopoulou | YES | `content/community/organizers/evangelia-mitsopoulou.md` |
| Georgios Giatsidis | YES | `content/community/organizers/george-giatsidis.md` |
| Konstantinos Ziazios | YES | `content/community/organizers/kostas-ziazios.md` |
| Eleftheria Batsou | YES | `content/community/organizers/eleftheria-batsou.md` |
| John Kapantzakis | YES | `content/community/organizers/john-kapatzakis.md` |
| Anna Kostopoulou | YES | `content/community/speakers/anna-kostopoulou.md` |
| Panagiota Mitsopoulou | NO | — |
| Georgios Michoulis | NO | — |
| Elias Papavasileiou | NO | — |
| John Pourdanis | NO | — |
| Savvas Papageorgiadis | NO | — |
| Alexandros Tsichouridis | NO | — |
| Katerina Patticha | NO | — |

### CommunityMember vs Speaker field mapping
| CommunityMember field | Speaker field | Notes |
|----------------------|---------------|-------|
| `name` | `name` | Direct match |
| `avatar` | `avatar` | Direct match |
| `bio` (markdown body) | `bio` | CommunityMember bio is long-form markdown |
| `social.linkedin` | `social.linkedin` | CommunityMember stores full URL; Speaker also stores full URL |
| `social.github` | `social.github` | — |
| `social.twitter` | `social.twitter` | — |
| `social.website` | — | CommunityMember has `website`, Speaker does not |
| `title`, `company`, `skills`, etc. | — | Not used in Speaker |

### Existing bug (not in scope, but worth noting)
In `app/events/[slug]/page.tsx:373`, the sidebar renders LinkedIn as:
```tsx
href={`https://linkedin.com/in/${speaker.social.linkedin}`}
```
But `speaker.social.linkedin` is already a full URL (e.g., `https://www.linkedin.com/in/evangelia-mitsopoulou/`), producing a broken double-URL. The talks section (line 236) correctly uses `href={speaker.social.linkedin}` directly.

## User Decisions (Confirmed)

### Decision 1: Path-only speaker references (Option B)
All speakers must have community member files. No inline speaker data in event frontmatter.

### Decision 2: Create all missing speaker files now (Option A)
Create files for all 7 missing speakers with dummy data under `content/community/speakers/`.

### Decision 3: Path without `.md` extension (Option A)
Format: `content/community/organizers/evangelia-mitsopoulou` (no `.md`)

## Plan

1. Create 7 missing speaker files in `content/community/speakers/` with dummy data
2. Update `Talk` type in `lib/types.ts`: change `speaker: Speaker[]` → `speaker: SpeakerRef[]` where `SpeakerRef = { path: string }`
3. Update `SpeakerSchema` in `lib/schemas.ts` to validate `path` field (remove inline fields)
4. Add `resolveSpeaker()` function in `lib/content.ts` to read community member file and map to `Speaker`
5. Update `getAllEvents()` in `lib/content.ts` to resolve path-based speakers into `Speaker` objects
6. Update ALL event frontmatter files to use `path` references only
7. No UI changes needed — the resolved `Speaker` object keeps the same shape
8. Verify build succeeds

## Testing Requirements
- Verify events with path-based speakers render correctly (avatar, name, bio, social links)
- Verify events with inline speakers still work
- Verify events with mixed speakers (some path, some inline) work
- Verify the `event.speakers` derivation from talks still works
- Verify EventCard, EventCardWide, NextEventPreview all render correctly
- Build succeeds without errors

## Documentation Updates
- None required (internal data flow change, no public API)
