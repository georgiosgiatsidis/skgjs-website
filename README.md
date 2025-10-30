# Thessaloniki JavaScript Meetup Website

Official website for the Thessaloniki JavaScript Meetup community - connecting JavaScript developers in Thessaloniki, Greece.

## 🚀 Features

- **Events Page**: Browse upcoming and past meetup events with filtering
- **Community Page**: Meet organizers, speakers, and active community members
- **Contact Form**: Get in touch with organizers via Web3Forms integration
- **Sponsors Section**: Showcase community sponsors
- **Instagram Feed**: Follow latest community updates
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, Open Graph, sitemap, and robots.txt
- **Fast Performance**: Static site generation with Next.js 14

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
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
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run test:ui` - Run E2E tests with UI

## 📁 Project Structure

```
skgjs-website/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── events/              # Events page
│   ├── community/           # Community page
│   ├── contact/             # Contact page
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/              # React components
│   ├── ui/                  # UI components (Button, Card, Input)
│   ├── layout/              # Layout components (Header, Footer)
│   ├── events/              # Event-related components
│   ├── community/           # Community-related components
│   ├── contact/             # Contact form components
│   └── home/                # Homepage sections
├── content/                 # Markdown content files
│   ├── events/             # Event markdown files
│   ├── community/          # Community member profiles
│   ├── sponsors/           # Sponsor information
│   └── site-config.md      # Site configuration
├── lib/                     # Utilities and helpers
│   ├── types.ts            # TypeScript types
│   ├── schemas.ts          # Zod validation schemas
│   ├── markdown.ts         # Markdown parsing utilities
│   ├── content.ts          # Content loading functions
│   └── constants.ts        # App constants
├── public/                  # Static assets
│   └── images/             # Images and logos
├── styles/                  # Global styles
├── tests/                   # Test files
│   ├── e2e/                # End-to-end tests
│   └── unit/               # Unit tests
└── specs/                   # Project specifications
```

## 📄 Content Management

### Adding a New Event

1. Create a new markdown file in `content/events/`:
   ```bash
   touch content/events/my-event-slug.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: "Event Title"
   date: "2025-11-15"
   time: "19:00"
   location: "Venue Name, Thessaloniki"
   status: "upcoming"
   rsvpLink: "https://meetup.com/your-event"
   speakers:
     - name: "Speaker Name"
       bio: "Speaker bio"
   tags:
     - React
     - TypeScript
   ---
   
   Event description in markdown...
   ```

### Adding a Community Member

1. Create a markdown file in `content/community/`:
   ```markdown
   ---
   name: "Member Name"
   role: "organizer" | "speaker" | "member"
   title: "Job Title"
   company: "Company Name"
   avatar: "/images/community/slug.svg"
   social:
     github: "https://github.com/username"
     linkedin: "https://linkedin.com/in/username"
   skills:
     - JavaScript
     - React
   ---
   
   Member bio...
   ```

### Adding a Sponsor

1. Create a markdown file in `content/sponsors/`:
   ```markdown
   ---
   name: "Sponsor Name"
   logo: "/images/sponsors/logo.svg"
   website: "https://sponsor.com"
   tier: "gold"
   active: true
   ---
   
   Sponsor description...
   ```

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
- Site name and tagline
- Social media links
- Contact email
- Next event reference

## 🧪 Testing

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:ui

# Run specific test file
npx playwright test tests/e2e/events.spec.ts
```

### Unit Tests
```bash
# Run unit tests
npm test

# Watch mode
npm test -- --watch
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

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to all the speakers, organizers, and members of the Thessaloniki JavaScript community
- Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and ❤️

## 📧 Contact

- Website: [skgjs.gr](https://skgjs.gr)
- Email: info@skgjs.gr
- Instagram: [@skgjs.gr](https://instagram.com/skgjs.gr)
- GitHub: [github.com/skgjs](https://github.com/skgjs)
- LinkedIn: [Thessaloniki JavaScript Meetup](https://linkedin.com/company/skgjs)

---

Made with 💛 by the Thessaloniki JavaScript Community
