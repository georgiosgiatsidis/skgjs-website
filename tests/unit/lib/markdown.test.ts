import { describe, it, expect } from 'vitest'
import { parseMarkdown } from '@/lib/markdown'

describe('Markdown Parsing Utilities', () => {
  describe('parseMarkdown', () => {
    it('should parse valid markdown with frontmatter', () => {
      const markdown = `---
title: "Test Event"
date: "2025-11-15"
time: "19:00"
location: "Test Location"
status: "upcoming"
rsvpLink: "https://example.com"
speakers:
  - name: "John Doe"
    bio: "Developer"
tags:
  - JavaScript
---

This is the event description.
`
      const result = parseMarkdown(markdown)

      expect(result).toBeDefined()
      expect(result.frontmatter.title).toBe('Test Event')
      expect(result.frontmatter.date).toBe('2025-11-15')
      expect(result.frontmatter.location).toBe('Test Location')
      expect(result.markdown).toContain('This is the event description.')
    })

    it('should handle markdown without tags', () => {
      const markdown = `---
title: "Simple Event"
date: "2025-12-01"
time: "18:00"
location: "Venue"
status: "upcoming"
rsvpLink: "https://example.com"
speakers: []
---

Simple description.
`
      const result = parseMarkdown(markdown)

      expect(result.frontmatter.title).toBe('Simple Event')
      expect(result.frontmatter.speakers).toEqual([])
      expect(result.markdown).toContain('Simple description.')
    })

    it('should parse community member markdown', () => {
      const markdown = `---
name: "Jane Smith"
role: "organizer"
title: "Developer"
company: "Tech Corp"
social:
  github: "https://github.com/jane"
  linkedin: "https://linkedin.com/in/jane"
skills:
  - React
  - TypeScript
---

Jane is an amazing developer.
`
      const result = parseMarkdown(markdown)

      expect(result.frontmatter.name).toBe('Jane Smith')
      expect(result.frontmatter.role).toBe('organizer')
      expect(result.frontmatter.skills).toEqual(['React', 'TypeScript'])
      expect(result.frontmatter.social.github).toBe('https://github.com/jane')
      expect(result.markdown).toContain('Jane is an amazing developer.')
    })

    it('should parse sponsor markdown', () => {
      const markdown = `---
name: "Tech Sponsor"
logo: "/logo.svg"
website: "https://sponsor.com"
tier: "gold"
active: true
---

Great sponsor description.
`
      const result = parseMarkdown(markdown)

      expect(result.frontmatter.name).toBe('Tech Sponsor')
      expect(result.frontmatter.tier).toBe('gold')
      expect(result.frontmatter.active).toBe(true)
      expect(result.markdown).toContain('Great sponsor description.')
    })

    it('should handle multiline markdown content', () => {
      const markdown = `---
title: "Multiline Event"
date: "2025-11-15"
time: "19:00"
location: "Venue"
status: "upcoming"
rsvpLink: "https://example.com"
speakers: []
---

# Heading

This is paragraph 1.

This is paragraph 2.

- List item 1
- List item 2
`
      const result = parseMarkdown(markdown)

      expect(result.markdown).toContain('# Heading')
      expect(result.markdown).toContain('paragraph 1')
      expect(result.markdown).toContain('List item 1')
    })

    it('should preserve markdown formatting', () => {
      const markdown = `---
name: "Test Member"
role: "member"
---

**Bold text** and *italic text* with [links](https://example.com).

\`\`\`javascript
const code = true;
\`\`\`
`
      const result = parseMarkdown(markdown)

      expect(result.markdown).toContain('**Bold text**')
      expect(result.markdown).toContain('*italic text*')
      expect(result.markdown).toContain('[links](https://example.com)')
      expect(result.markdown).toContain('```javascript')
    })

    it('should handle empty markdown content', () => {
      const markdown = `---
title: "Empty Event"
date: "2025-11-15"
time: "19:00"
location: "Venue"
status: "upcoming"
rsvpLink: "https://example.com"
speakers: []
---
`
      const result = parseMarkdown(markdown)

      expect(result.markdown).toBe('')
    })

    it('should handle frontmatter with special characters', () => {
      const markdown = `---
title: "Event: Special & <Characters>"
date: "2025-11-15"
time: "19:00"
location: "Café @ Downtown"
status: "upcoming"
rsvpLink: "https://example.com?param=value&other=123"
speakers: []
---

Content here.
`
      const result = parseMarkdown(markdown)

      expect(result.frontmatter.title).toBe('Event: Special & <Characters>')
      expect(result.frontmatter.location).toBe('Café @ Downtown')
      expect(result.frontmatter.rsvpLink).toContain('param=value')
    })

    it('should handle markdown without frontmatter', () => {
      const markdown = `# Just regular markdown

Without any frontmatter.
`
      const result = parseMarkdown(markdown)

      expect(result.frontmatter).toEqual({})
      expect(result.markdown).toContain('# Just regular markdown')
    })

    it('should parse arrays in frontmatter correctly', () => {
      const markdown = `---
tags:
  - JavaScript
  - React
  - TypeScript
---

Content
`
      const result = parseMarkdown(markdown)

      expect(Array.isArray(result.frontmatter.tags)).toBe(true)
      expect(result.frontmatter.tags).toHaveLength(3)
      expect(result.frontmatter.tags).toContain('React')
    })
  })
})
