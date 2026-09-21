import { request, type FullConfig } from '@playwright/test'
import fs from 'fs'
import path from 'path'

// `next dev` compiles routes on demand. The first client-side navigation to a cold route waits on
// that compile, and on a slow CI runner it outran the assertion timeout: the URL stayed on the
// page the test clicked from, so every click-through-to-another-page test was flaky. Requesting
// each route once gets the compiling out of the way before the suite starts.
//
// This is a warm-up, never a gate: anything that goes wrong here is swallowed, because the worst
// case is the slowness it exists to avoid, not a failed run.
const projectRoot = path.resolve(__dirname, '..', '..')

const staticRoutes = ['/', '/events/', '/community/', '/about-us/', '/contact/', '/privacy/']

// One event is enough: every detail page shares the /events/[slug] route module.
function firstEventRoute(): string | null {
  try {
    const [filename] = fs
      .readdirSync(path.join(projectRoot, 'content', 'events'))
      .filter((name) => name.endsWith('.md'))
      .sort()

    return filename ? `/events/${filename.replace(/\.md$/, '')}/` : null
  } catch {
    return null
  }
}

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  if (!baseURL) return

  const eventRoute = firstEventRoute()
  const routes = eventRoute ? [...staticRoutes, eventRoute] : staticRoutes

  const context = await request.newContext({ baseURL })
  try {
    // Serially: a cold dev server compiles one route at a time regardless, and firing them in
    // parallel only makes the slowest response slower.
    for (const route of routes) {
      try {
        await context.get(route, { timeout: 120_000 })
      } catch (error) {
        console.warn(`[warm-up] skipped ${route}:`, error instanceof Error ? error.message : error)
      }
    }
  } finally {
    await context.dispose()
  }
}

export default globalSetup
