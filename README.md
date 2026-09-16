# Thessaloniki JavaScript Meetup Website

Official website for the Thessaloniki JavaScript Meetup community - connecting JavaScript developers in Thessaloniki, Greece.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: Markdown files with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm)
- **Validation**: [Zod](https://zod.dev/)
- **Testing**:
  - E2E: [Playwright](https://playwright.dev/)
  - Unit: [Vitest](https://vitest.dev/)
- **Deployment**: GitHub Pages

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🏃‍♂️ Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/skgjs-website.git
   cd skgjs-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:e2e` - Run E2E tests
- `npm run test:e2e:ui` - Run E2E tests with UI
- `npm run analyze` - Build with bundle analyzer

## 📁 Project Structure

```
skgjs-website/
├── .claude/skills/           # Task instructions for coding agents
├── AGENTS.md                 # Repository guidelines for coding agents
├── CLAUDE.md                 # Points Claude Code to AGENTS.md
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── about-us/            # About us page
│   ├── events/              # Events page
│   ├── community/           # Community page
│   ├── contact/             # Contact page
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/              # React components
│   ├── ui/                  # UI components (Button, Card, Input, Countdown)
│   ├── layout/              # Layout components (Header, Footer, Container)
│   ├── animations/          # Animation components (ScrollReveal, CountUp, ParallaxWrapper)
│   ├── events/              # Event-related components
│   ├── community/           # Community-related components
│   ├── contact/             # Contact form components
│   └── home/                # Homepage sections
├── content/                 # Markdown content files
│   ├── events/             # Event markdown files
│   ├── community/          # Community member profiles
│   │   ├── organizers/     # Organizer profiles
│   │   └── speakers/       # Speaker profiles
│   ├── partners/           # Partner information
│   └── site-config.md      # Site configuration
├── lib/                     # Utilities and helpers
│   ├── types.ts            # TypeScript types
│   ├── schemas.ts          # Zod validation schemas
│   ├── markdown.ts         # Markdown parsing utilities
│   ├── content.ts          # Content loading functions
│   ├── event-utils.ts      # Event date/status helpers
│   ├── stats.ts            # Community statistics
│   └── constants.ts        # App constants
├── public/                  # Static assets
│   └── images/             # Images and logos
├── styles/                  # Global styles
└── tests/                   # Test files
    ├── e2e/                # End-to-end tests
    └── unit/               # Unit tests
```

## 📄 Content Management

### Adding a New Event

> Coding agents can follow the `skgjs-website-add-event` skill in `.claude/skills/` (see [AGENTS.md](./AGENTS.md)).

1. Create a new markdown file in `content/events/` named `YYYY-MM-DD-event-slug.md`:

   ```bash
   touch content/events/2025-11-15-my-event.md
   ```

2. Add frontmatter and content:

   ```markdown
   ---
   index: 7
   title: 'SKG JS Meetup #7: Event Title'
   date: '2025-11-15'
   time: '19:00'
   location: 'OK!Thess, Komotinis 2, 54655, Thessaloniki'
   rsvpLink: 'https://www.meetup.com/skg-js/events/123456/'
   talks:
     - title: 'Talk Title'
       description: 'Brief description of the talk.'
       presentation: 'folder-name/presentation.pptx'
       speaker:
         - path: 'content/community/speakers/speaker-slug'
     - title: 'Second Talk Title'
       description: 'Brief description of the second talk.'
       speaker:
         - path: 'content/community/organizers/organizer-slug'
   tags: ['react', 'typescript']
   image: 'https://example.com/event-image.jpeg'
   ---

   Event description in markdown...
   ```

   **Notes:**
   - `index` — sequential meetup number (special off-series events may use a decimal, e.g. `7.5`)
   - `date` and `time` — must be quoted strings; unquoted YAML dates are parsed as `Date` objects and fail validation
   - `talks` — optional, omit for events without talks
   - `talks[].speaker[].path` — references a community member file (without `.md` extension); the file must exist or the build fails
   - `talks[].presentation` — optional, path relative to `events/event-<index>/` in the B2 bucket (upload the file there)
   - `description` — optional, short summary shown on the event card
   - `image` — optional, URL for the event cover image
   - Upcoming/past status is determined automatically from the `date` field

3. Run `npm test` — event frontmatter is validated against `EventSchema` in `lib/schemas.ts`, and unknown keys (e.g. typos) are rejected

### Adding a Community Member

Community members are organized in subdirectories by role: `content/community/organizers/` and `content/community/speakers/`.

1. Create a markdown file in the appropriate subdirectory:

   ```markdown
   ---
   index: 1
   name: 'Member Name'
   role: organizer
   social:
     linkedin: 'https://linkedin.com/in/username'
     github: 'https://github.com/username'
   contributedTalks:
     - 'Talk Title'
   ---

   Member bio in markdown...
   ```

   **Notes:**
   - `index` — controls display order
   - `role` — one of `organizer`, `speaker`, or `member`
   - `social` — all fields optional (`github`, `linkedin`, `twitter`, `website`)
   - `contributedTalks` — lists the talks given by this member
   - Optional fields: `title`, `company`, `avatar`, `joinedDate` (quoted `YYYY-MM-DD`), `skills`
   - The markdown body is the member bio and must not be empty
   - Frontmatter is validated against `CommunityMemberSchema` in `lib/schemas.ts`; unknown keys (e.g. typos) are rejected
   - The filename slug is used as the reference path from event files (e.g., `content/community/speakers/john-doe`)

### Adding a Partner

1. Create a markdown file in `content/partners/`:

   ```markdown
   ---
   name: 'Partner Name'
   logo: '/images/partners/logo.webp'
   website: 'https://partner.com'
   tier: 'community'
   active: true
   since: '2025-09-01'
   description: 'Short description of the partner (20-200 characters).'
   ---

   Longer partner description in markdown...
   ```

   **Notes:**
   - `tier` — one of `gold`, `silver`, `bronze`, `community`
   - Add the logo image to `public/images/partners/`

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  'js-yellow': '#F7DF1E',  // JavaScript yellow
  'js-black': '#1A1A1A',   // JavaScript black
}
```

### Site Configuration

Edit `content/site-config.md` to update:

- Site name, tagline, and description
- Social media links (Meetup, Instagram)
- Contact email
- Speaker form URL (`speakerFormUrl`)
- About section content (markdown body of the file)

## 🧪 Testing

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/events.spec.ts
```

### Unit Tests

```bash
# Run unit tests
npm test

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Visit your site at `https://your-org.github.io/skgjs-website`

### Manual Deployment

```bash
# Build the site
npm run build

# The static files are in the `out` directory
# Upload to any static hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Thanks to all the speakers, organizers, and members of the Thessaloniki JavaScript community
- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact

- Website: [skgjs.gr](https://skgjs.gr)
- Email: info@skgjs.gr
- Meetup: [SKG JS](https://www.meetup.com/skg-js/)
- Instagram: [@skgjs.gr](https://www.instagram.com/skgjs.gr/)

---

Made with 💛 by the Thessaloniki JavaScript Community
