---
name: skgjs-website-add-event
description: >
  Use when asked to add, create, or announce a new or upcoming SKG JS meetup event on the
  website, including events with new speakers, special off-series events, or events without
  talks. Also use when adding a talk or speaker to an existing event file in content/events/.
  Triggers: "add event", "new event", "upcoming event", "next meetup", "event #N",
  "add meetup", "announce meetup", "add talk to event".
---

# SKG JS Website — Adding a New Event

An event is a single markdown file in `content/events/`. Its frontmatter is validated by
`EventSchema` in `lib/schemas.ts` (strict: unknown keys fail), and every speaker `path` must
point to an existing community member file, otherwise `lib/content.ts` throws and the build fails.

## 1. Collect the details — ask once, in one batch

| Field          | Required | Default / source                                                   |
| -------------- | -------- | ------------------------------------------------------------------ |
| Title          | yes      | `SKG JS Meetup #<index> <Talk A>, <Talk B>` (5–100 chars)          |
| Date           | yes      | `YYYY-MM-DD`                                                       |
| Time           | yes      | `'19:00'` (format `HH:MM` or `HH:MM-HH:MM`)                        |
| Location       | yes      | `'OK!Thess, Komotinis 2, 54655, Thessaloniki'`                     |
| RSVP link      | yes      | Meetup event URL, must start with `https://`                       |
| Talks          | no       | title, description, speaker(s), optional presentation file name    |
| Tags           | no       | short lowercase topics, e.g. `['k6', 'test', 'automation']`        |
| Cover image    | no       | the Meetup event image URL (`https://secure.meetupstatic.com/...`) |
| Body text      | yes      | one or more paragraphs describing the event                        |
| Special event? | yes      | whether this is off the numbered series (affects `index`)          |

Never invent missing required values (RSVP link, date, speakers). Ask for them.

## 2. Pick the index

```bash
grep -h '^index:' content/events/*.md
```

- Numbered meetup: highest **integer** index + 1.
- Special off-series event: a decimal between its neighbours (existing example: `7.5`).
- Confirm the index with the user — presentations are served from `events/event-<index>/` in B2,
  so changing it later breaks presentation links.

## 3. Resolve every speaker

For each speaker, look for an existing file:

```bash
ls content/community/speakers/ content/community/organizers/
```

- **Exists:** reference it as `content/community/<speakers|organizers>/<slug>` (no `.md`), and
  append the new talk title to that file's `contributedTalks`.
- **Missing:** create `content/community/speakers/<firstname-lastname>.md`:

```markdown
---
index: <highest index in content/community/speakers/ + 1>
name: Firstname Lastname
role: speaker
avatar: /images/community/<firstname-lastname>.jpeg
social:
  linkedin: https://www.linkedin.com/in/<handle>/
contributedTalks:
  - <Talk title>
---

Speaker at SKG JS meetup events.
```

- Ask the user for the speaker's LinkedIn/GitHub URLs and a photo. Omit `social` keys that are not
  provided. Include `avatar` only if the photo is saved to `public/images/community/`.
- Use a bio from the user in place of the default body when one is given.

## 4. Create the event file

File name: `content/events/<date>-<short-kebab-slug>.md` (e.g. `2026-05-21-k6-test-automation.md`).

```markdown
---
index: 9
title: 'SKG JS Meetup #9 Talk A, Talk B'
date: '2026-10-15'
time: '19:00'
location: 'OK!Thess, Komotinis 2, 54655, Thessaloniki'
rsvpLink: 'https://www.meetup.com/skg-js/events/123456789/'
talks:
  - title: 'Talk A'
    description: 'What the talk covers.'
    speaker:
      - path: 'content/community/speakers/firstname-lastname'
  - title: 'Talk B'
    description: 'What the talk covers.'
    speaker:
      - path: 'content/community/organizers/firstname-lastname'
tags: ['topic-a', 'topic-b']
image: 'https://secure.meetupstatic.com/photos/event/.../highres_123.webp'
---

Event description paragraphs...
```

Rules:

- Quote `date`, `time`, and every string. Unquoted `2026-10-15` becomes a `Date` and fails validation.
- `index` is an unquoted number.
- Allowed keys only: `index`, `title`, `date`, `time`, `location`, `rsvpLink`, `description`,
  `talks`, `tags`, `capacity`, `image`. Talk keys: `title`, `description`, `presentation`, `speaker`.
- Put the event description in the markdown body. Do not add a `description` frontmatter field
  unless the user asks for a card summary.
- Omit `talks` entirely for events without talks (e.g. a round-table).
- Add `presentation: '<file-name>'` to a talk only when the user has the file; remind them to
  upload it to the B2 bucket under `events/event-<index>/<file-name>`.

## 5. Verify

```bash
npm test            # validates every event file and resolves speaker paths
npm run type-check
```

`npm run build` needs the `B2_ACCESS_KEY_ID`, `B2_SECRET_ACCESS_KEY`, `B2_BUCKET_NAME`, and
`B2_REGION` environment variables; run it only when they are set. Without them the build fails
in `lib/b2.ts` for reasons unrelated to the event.

A validation failure names the file and field, e.g.
`Invalid event frontmatter in content/events/<file>.md: - date: Expected string, received date`.
Fix the content — never loosen `EventSchema` to make an event pass.

## Common Mistakes

| Mistake                                     | Result                                                      | Fix                                 |
| ------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| Unquoted date/time                          | `Expected string, received date`                            | Quote the value                     |
| Typo in a key (`rsvplink`)                  | `Unrecognized key(s) in object`                             | Use the exact key name              |
| Speaker path with `.md` or wrong folder     | `Speaker file not found`                                    | `content/community/<folder>/<slug>` |
| New speaker without a file                  | `Speaker file not found`                                    | Create the speaker file (step 3)    |
| Index reused or guessed                     | Wrong B2 presentation URLs                                  | Compute and confirm (step 2)        |
| Pinning via `nextEvent` in `site-config.md` | Unneeded; the soonest upcoming event is shown automatically | Only pin when the user asks         |
