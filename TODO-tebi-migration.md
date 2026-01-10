# TODO: Migrate from Backblaze B2 to Tebi Storage [COMPLETED]

## TL;DR
Replace Backblaze B2 storage provider with Tebi (S3-compatible). Requires changing SDK, environment variables, and URL patterns. All existing files must be migrated to Tebi bucket separately.

## Requirements
User request (verbatim):
> "I want to fully replace Backblaze B2 with Tebi (tebi.io) as my storage provider."

Reference documentation provided:
- https://docs.tebi.io/code_examples/nodejs_sdk_v3.html
- https://docs.tebi.io/intro/index.html

## Facts: Current Backblaze B2 Implementation

### Files Affected

| File | Purpose |
|------|---------|
| `lib/b2.ts` (136 lines) | Main B2 client - singleton pattern, authorization, file listing |
| `types/backblaze-b2.d.ts` (110 lines) | TypeScript declarations for B2 SDK |
| `app/events/[slug]/page.tsx` (lines 11, 15-18, 56) | Uses B2 for photos and presentation URLs |
| `lib/types.ts` (lines 93-110) | B2 type definitions (B2File, B2FileListResponse, B2SignedUrl) |
| `components/examples/B2FileBrowser.tsx` (140 lines) | Example UI component (may be unused) |
| `.env` | B2 credentials configuration |
| `package.json` | `backblaze-b2` dependency |

### Current B2 Operations
1. **Authorization**: Custom singleton with 23-hour token refresh
2. **List Files**: `listFileNames()` with prefix filtering for event photos
3. **URL Generation**: Hardcoded `https://f003.backblazeb2.com/file/{bucket}/{path}` pattern

### Current Environment Variables
```
B2_KEY_ID=<application_key_id>
B2_APP_KEY=<application_key>
B2_BUCKET_ID=<bucket_id>
B2_BUCKET_NAME=skgjs-website
```

### Current URL Patterns
- Photos: `https://f003.backblazeb2.com/file/skgjs-website/events/{eventIndex}/photos/{filename}`
- Presentations: `https://f003.backblazeb2.com/file/skgjs-website/events/{eventIndex}/{presentation.pptx}`

## Facts: Tebi Configuration

### Tebi Connection Details (from docs)
- **S3 Endpoint**: `https://s3.tebi.io` (global)
- **Regional Endpoints**:
  - Germany/Europe: `s3.de.tebi.io`
  - USA East: `s3.use.tebi.io`
  - USA West: `s3.usw.tebi.io`
  - Singapore: `s3.sgp.tebi.io`
- **Region**: `"global"` (single region value)
- **SDK**: AWS SDK v3 (`@aws-sdk/client-s3`)

### Tebi SDK Example
```typescript
import { S3Client, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: {
    accessKeyId: "<YOUR_KEY>",
    secretAccessKey: "<YOUR_SECRET>"
  },
  region: "global"
});
```

### Tebi Public URL Patterns (CONFIRMED)
Two URL formats available:
- **Virtual-hosted style**: `https://{bucket-name}.s3.tebi.io/{path}/{filename}`
- **Path style**: `https://s3.tebi.io/{bucket-name}/{path}/{filename}`

**Note**: Tebi buckets are always public, but file ACLs control individual file access. Must set "Access control settings to public" in bucket settings.

## User Made Decisions
1. **Public URL Strategy**: B - Public Bucket (direct URLs like current B2)
2. **Regional Endpoint**: A - Global (`s3.tebi.io`)
3. **B2FileBrowser.tsx**: A - Delete (unused example component)
4. **Tebi Bucket Name**: `skg-website`
5. **Tebi Credentials**: Not ready yet - user will add later

## Implied Decisions
1. Keep the same file structure in Tebi (`events/{eventIndex}/photos/`, etc.)
2. Bucket name likely stays `skgjs-website` (or user chooses new name)
3. Use global endpoint (unless user prefers regional for latency)

## Pending Decisions

### Decision 1: Public URL Access Strategy
**Context**: Currently, photos and presentations use direct public URLs (`f003.backblazeb2.com/file/...`). Tebi is S3-compatible but the public URL pattern isn't documented.

**Options**:

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| A. Presigned URLs | Generate time-limited signed URLs for all file access | Secure, no public bucket needed | Requires server-side URL generation for all files, URLs expire |
| B. Public Bucket | Configure Tebi bucket as public, use direct URLs | Simple, similar to current B2 setup | Requires research on Tebi's public bucket URL format |
| C. Hybrid | Presigned for downloads, public for images | Balanced security | More complex logic |

**Recommendation**: Option B (Public Bucket) - maintains simplicity and matches current architecture. We need to verify Tebi's public URL format.

### Decision 2: Regional Endpoint Selection
**Context**: Tebi offers global and regional endpoints. Current B2 uses a single endpoint.

**Options**:

| Option | Description |
|--------|-------------|
| A. Global (`s3.tebi.io`) | Single worldwide endpoint, simplest |
| B. Europe (`s3.de.tebi.io`) | Better latency for European users |

**Recommendation**: Option A (Global) - simplest, matches Tebi docs examples.

### Decision 3: What to do with `B2FileBrowser.tsx`
**Context**: `components/examples/B2FileBrowser.tsx` is an example component. It references B2 API routes that don't exist in the codebase.

**Options**:

| Option | Description |
|--------|-------------|
| A. Delete | Remove this unused example component |
| B. Migrate | Update to use Tebi (even if unused) |
| C. Keep as-is | Leave broken (not recommended) |

**Recommendation**: Option A (Delete) - it's an example component with non-existent API routes.

### Decision 4: Tebi Bucket Name
**Context**: Need to know your Tebi bucket name.

**Question**: What is your Tebi bucket name?

### Decision 5: Tebi Credentials
**Context**: Need to know how you'll provide Tebi credentials.

**Question**: Do you have Tebi access key and secret key ready? The env vars will be named:
- `TEBI_ACCESS_KEY_ID`
- `TEBI_SECRET_ACCESS_KEY`
- `TEBI_BUCKET_NAME`

## Plan

### Phase 1: SDK & Configuration
1. Remove `backblaze-b2` dependency
2. Add `@aws-sdk/client-s3` dependency
3. Update `.env` structure for Tebi credentials
4. Delete `types/backblaze-b2.d.ts`

### Phase 2: Core Client Migration
1. Rewrite `lib/b2.ts` → `lib/tebi.ts` (or keep as `lib/storage.ts`)
   - Use AWS SDK v3 S3Client
   - Implement `listEventPhotos()` using `ListObjectsV2Command`
   - Update URL generation for Tebi format
2. Update `lib/types.ts` - remove/update B2-specific types

### Phase 3: Consumer Updates
1. Update `app/events/[slug]/page.tsx`:
   - Change imports from `lib/b2` to new module
   - Update `getPresentationUrl()` for Tebi URL format
2. Handle `B2FileBrowser.tsx` (based on decision)

### Phase 4: Cleanup & Testing
1. Remove old B2 files
2. Update any documentation (TODO-talks-refactor.md mentions B2 URLs)
3. Test locally with Tebi credentials
4. Verify photo gallery and presentation downloads work

## Testing Requirements
- [ ] Photos load correctly on event pages
- [ ] Presentation download links work
- [ ] `listEventPhotos()` returns correct file list
- [ ] Empty folder handling (graceful fallback)
- [x] Build succeeds without B2 dependency (type-check passes)

## Documentation Updates Required
- [x] Update `TODO-talks-refactor.md` (line 50-54) - B2 URL pattern reference
- [x] Update `.env` comments

## Implementation Status: COMPLETED

### Files Changed
- `package.json` - Replaced `backblaze-b2` with `@aws-sdk/client-s3`
- `lib/tebi.ts` - NEW: Tebi S3 client implementation
- `app/events/[slug]/page.tsx` - Updated imports and URL generation
- `.env` - Added Tebi configuration (kept B2 vars for reference)
- `lib/types.ts` - Removed B2-specific types
- `TODO-talks-refactor.md` - Updated URL patterns

### Files Deleted
- `lib/b2.ts` - Old B2 client
- `types/backblaze-b2.d.ts` - B2 type definitions
- `components/examples/B2FileBrowser.tsx` - Unused example component

### Next Steps for User
1. Add Tebi credentials to `.env`:
   - `TEBI_ACCESS_KEY_ID=<your_key>`
   - `TEBI_SECRET_ACCESS_KEY=<your_secret>`
2. Migrate files from B2 bucket to Tebi bucket `skg-website`
3. Configure Tebi bucket for public access (ACL settings)
4. Test event pages with photos and presentation downloads
5. Remove B2 credentials from `.env` after verifying everything works
