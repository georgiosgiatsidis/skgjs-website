# TODO: Refactor Event Talks Structure - COMPLETED

## TL;DR
Migrate all event markdown files to use the new `talks` structure (with embedded speakers), update TypeScript types, and refactor the event page to display talks prominently with download links for presentations.

## Requirements (User's Words)
> "I want to separate a bit the talks descriptions to be more prominent. I also want to show a link that downloads each talks presentation file."
> "Check the changes that I've made on [content/events/2025-04-25-core-web-vitals-react19.md] file, I placed the speakers inside each one of the talks. I also added a presentation attribute to the talk."
> "The presentation link should follow the backblaze bucket path: `https://f003.backblazeb2.com/file/<bucket_name>/events/<event_index>/<talk_presentation_path>`"

## Facts (Code Analysis)

### Current Structure (Old Events)
All events except `2025-04-25-core-web-vitals-react19.md` use:
```yaml
speakers:
  - name: 'Speaker Name'
    social:
      linkedin: 'url'
```
Talk descriptions are in the markdown body, not in frontmatter.

### New Structure (Reference File)
`2025-04-25-core-web-vitals-react19.md` uses:
```yaml
talks:
  - title: 'Talk Title'
    presentation: 'path/to/file.pptx'  # optional
    speaker:
      - name: 'Speaker Name'
        social:
          linkedin: 'url'
```

### Files to Update
1. `content/events/2024-12-05-kickoff-meetup.md` - 2 talks, 2 speakers
2. `content/events/2025-02-13-llms-webassembly.md` - 2 talks, 2 speakers
3. `content/events/2025-06-19-chrome-extension-playwright.md` - 2 talks, 2 speakers
4. `content/events/2025-10-07-microfrontends-haii.md` - 2 talks, 2 speakers
5. `content/events/2025-12-16-ai-angular-reactivity.md` - 2 talks, 2 speakers

### TypeScript Types
- `lib/types.ts` - Currently has `Speaker` interface and `Event.speakers: Speaker[]`
- Need to add `Talk` interface and `Event.talks: Talk[]`

### Event Page Template
- `app/events/[slug]/page.tsx` - Currently shows speakers in sidebar
- Needs refactoring to show talks section with presentation download links

### B2 Bucket URL Pattern
From `lib/b2.ts` line 117-127:
- Base URL: `https://f003.backblazeb2.com`
- Pattern: `${downloadUrl}/file/${bucketName}/${path}`
- For presentations: `https://f003.backblazeb2.com/file/<bucket_name>/events/<event_index>/<presentation_path>`

## User Made Decisions
- Structure: Use `talks` array with embedded `speaker` array per talk
- Presentation attribute: Optional `presentation` field per talk
- URL format: `https://f003.backblazeb2.com/file/<bucket_name>/events/<event_index>/<talk_presentation_path>`

## Pending Decisions

### 1. Bug Fix in Reference File
**Evidence**: Line 19 in `2025-04-25-core-web-vitals-react19.md`:
```yaml
        linkedin:       linkedin: 'https://www.linkedin.com/in/johnkapantzakis/'
```
This appears to be a typo (duplicate `linkedin:`).

**Question**: Should I fix this typo to:
```yaml
        linkedin: 'https://www.linkedin.com/in/johnkapantzakis/'
```

**Options**:
- A. Yes, fix the typo
- B. No, leave as-is

**Recommendation**: A - This is clearly a typo that will break parsing.

### 2. Backward Compatibility for `speakers` Field
**Context**: The Event type currently has `speakers: Speaker[]`. If we add `talks: Talk[]`, should we:

**Options**:
- A. Replace `speakers` with `talks` completely (breaking change, needs migration of all components)
- B. Keep both `speakers` and `talks`, derive `speakers` from `talks` for compatibility
- C. Keep both as separate optional fields

**Recommendation**: B - Derive `speakers` from `talks` to maintain backward compatibility with any component that uses `event.speakers`. Less risk of breaking existing functionality.

### 3. Talk Description Source
**Context**: Currently talk descriptions are in the markdown body. The new `talks` structure doesn't include a description field.

**Options**:
- A. Add `description` field to each talk in frontmatter
- B. Keep descriptions in markdown body (no change needed)
- C. Both - add optional `description` field but keep markdown as fallback

**Recommendation**: B - Keep descriptions in markdown body for now. This is less disruptive and the markdown content already has the descriptions formatted nicely.

### 4. Bucket Name for Presentation URLs
**Context**: The bucket name comes from env var `B2_BUCKET_NAME`. For the presentation URLs, should we:

**Options**:
- A. Use env var at runtime (consistent with photo gallery)
- B. Hardcode the bucket name in the template
- C. Make it configurable in site-config.md

**Recommendation**: A - Use env var at runtime for consistency.

## Plan

### Phase 1: Fix and Update Types
1. Fix the typo in `2025-04-25-core-web-vitals-react19.md`
2. Add `Talk` interface to `lib/types.ts`
3. Update `Event` interface to include `talks?: Talk[]`

### Phase 2: Migrate Event Markdown Files
4. Update `2024-12-05-kickoff-meetup.md` with new talks structure
5. Update `2025-02-13-llms-webassembly.md` with new talks structure
6. Update `2025-06-19-chrome-extension-playwright.md` with new talks structure
7. Update `2025-10-07-microfrontends-haii.md` with new talks structure
8. Update `2025-12-16-ai-angular-reactivity.md` with new talks structure

### Phase 3: Refactor Event Page
9. Update `app/events/[slug]/page.tsx` to render talks section
   - Show each talk with title
   - Show speaker info per talk
   - Show download link for presentation (if available)
   - Use B2 bucket URL pattern from env vars

## Testing Requirements
- Build project to verify TypeScript compilation
- Check each event page renders correctly
- Verify presentation links generate correct URLs
- Test on events with and without presentation files

## Documentation Updates
None required - this is internal structure change.
