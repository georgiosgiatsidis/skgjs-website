import { Container } from '@/components/layout/Container'
import { Card } from '@/components/ui/Card'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { getSiteConfig } from '@/lib/content'

export const metadata = {
  title: 'Privacy | Thessaloniki JavaScript Meetup',
  description:
    'How the Thessaloniki JavaScript Meetup handles personal data: the contact form, third-party services, cookies, and your rights under the GDPR.',
}

// Kept in one place so the footer date and the closing line cannot drift apart.
const LAST_UPDATED = '21 September 2026'

const prose =
  'prose prose-lg max-w-none dark:prose-invert prose-headings:text-js-black prose-p:text-gray-600 prose-a:text-js-yellow prose-a:no-underline hover:prose-a:underline prose-strong:text-js-black prose-ul:text-gray-600 prose-li:text-gray-600 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-ul:text-gray-300 dark:prose-li:text-gray-300'

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function PrivacyPage() {
  const config = getSiteConfig()
  const email = config.contact?.email

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-js-black to-gray-900 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-js-yellow/10 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-js-yellow/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <span className="mb-4 inline-block rounded-full bg-js-yellow/10 px-4 py-2 text-sm font-medium text-js-yellow">
                Privacy
              </span>
            </ScrollReveal>

            <h1 className="mb-6 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              How we handle your data
            </h1>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-300 md:text-xl">
                We are a volunteer community, not a business. This page explains exactly what
                happens to personal data on this site &mdash; and what does not.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Card className="overflow-hidden p-0">
              <div className={`p-8 md:p-12 ${prose}`}>
                <h2>Who we are</h2>
                <p>
                  This site is run by <strong>SKG JS &mdash; Thessaloniki JavaScript Meetup</strong>
                  , a volunteer developer community based in Thessaloniki, Greece. We decide why and
                  how the personal data described below is handled, which makes us the{' '}
                  <strong>data controller</strong> under the GDPR.
                </p>
                <p>
                  For anything on this page, including any request about your own data, email us at{' '}
                  {email ? (
                    <a href={`mailto:${email}`}>{email}</a>
                  ) : (
                    <span>our contact address</span>
                  )}
                  . A real person reads it.
                </p>

                <h2>The contact form</h2>
                <p>
                  When you send us a message through the <a href="/contact/">contact form</a>, we
                  receive the <strong>name</strong>, <strong>email address</strong>,{' '}
                  <strong>subject</strong> and <strong>message</strong> you type in. We use them for
                  one purpose: to read your message and reply to it.
                </p>
                <p>
                  Our legal basis is <strong>legitimate interest</strong> (Article 6(1)(f) GDPR)
                  &mdash; you contacted us, and answering you is the obvious expected outcome. You
                  are never required to use the form; our email address is on the{' '}
                  <a href="/contact/">contact page</a> if you prefer to write directly.
                </p>
                <p>
                  Once a message reaches our inbox we keep it for as long as it takes to deal with
                  the enquiry, and delete it when it is no longer useful.
                </p>

                <h3>Who else sees a form submission</h3>
                <p>
                  The form does not post to our own server &mdash; this site is a set of static
                  files with no backend. Your submission passes through the following services
                  before it reaches us:
                </p>
                <ul>
                  <li>
                    <strong>Web3Forms</strong> receives your submission and forwards it to our
                    inbox. Alongside the fields you fill in, it records technical metadata about the
                    submission &mdash; your <strong>IP address</strong>, a timestamp and the page
                    you submitted from. It is operated by Web3Creative, which operates from India
                    and uses Amazon Web Services, Cloudflare and Hetzner (EU) as infrastructure
                    providers. Web3Forms acts as our data processor under its Data Processing
                    Agreement, and transfers of data out of the EEA are made under Standard
                    Contractual Clauses. Note that Web3Forms{' '}
                    <strong>
                      stores form submissions for up to three years from the date of submission
                    </strong>
                    , after which they are deleted automatically; its server logs are deleted on a
                    regular basis. See the{' '}
                    <ExternalLink href="https://web3forms.com/privacy">
                      Web3Forms privacy policy
                    </ExternalLink>
                    .
                  </li>
                  <li>
                    <strong>CleanTalk</strong> and <strong>Akismet</strong> are the spam-filtering
                    services Web3Forms uses. Your <strong>IP address</strong> and{' '}
                    <strong>email address</strong> may be sent to them so the submission can be
                    checked for spam and abuse. See the{' '}
                    <ExternalLink href="https://cleantalk.org/publicoffer#privacy">
                      CleanTalk privacy policy
                    </ExternalLink>{' '}
                    and the{' '}
                    <ExternalLink href="https://automattic.com/privacy/">
                      Akismet privacy policy
                    </ExternalLink>
                    .
                  </li>
                  <li>
                    <strong>hCaptcha</strong> protects the form from automated spam. It is operated
                    by Intuition Machines, Inc. in the United States, and it processes your IP
                    address, browser and device information, and how you interact with the challenge
                    in order to tell people from bots. Intuition Machines is certified under the
                    EU&ndash;US Data Privacy Framework and uses Standard Contractual Clauses. See
                    the{' '}
                    <ExternalLink href="https://www.hcaptcha.com/privacy">
                      hCaptcha privacy policy
                    </ExternalLink>
                    .
                  </li>
                </ul>
                <p>
                  Web3Forms can also push submissions into services such as Google Sheets, Slack,
                  Telegram or Discord. We have <strong>none of those integrations enabled</strong>
                  &mdash; your message is only emailed to us.
                </p>

                <h2>Hosting</h2>
                <p>
                  The site is hosted on <strong>GitHub Pages</strong> (GitHub, Inc., United States).
                  Like any web host, GitHub records standard technical information when a page is
                  requested, including your IP address and browser user agent. We have no access to
                  those logs. See the{' '}
                  <ExternalLink href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
                    GitHub privacy statement
                  </ExternalLink>
                  .
                </p>

                <h2>Images loaded from other services</h2>
                <p>
                  Some images on this site are not served from skgjs.gr. Your browser fetches them
                  directly, which means those services can see your IP address and user agent:
                </p>
                <ul>
                  <li>
                    <strong>Backblaze B2</strong> (EU region, Amsterdam) &mdash; event photo
                    galleries and talk slides
                  </li>
                  <li>
                    <strong>Meetup</strong> &mdash; event cover images
                  </li>
                  <li>
                    <strong>GitHub</strong> and <strong>Amazon S3</strong> &mdash; a few partner
                    logos
                  </li>
                </ul>
                <p>
                  We do not place cookies through these services and we receive nothing back from
                  them.
                </p>

                <h2>Cookies, analytics and tracking</h2>
                <p>
                  <strong>We run no analytics, no advertising and no tracking of any kind.</strong>{' '}
                  We set no cookies of our own, which is why this site has no cookie banner.
                </p>
                <p>
                  The one exception is hCaptcha, which may store information on your device &mdash;
                  but only on the <a href="/contact/">contact page</a>, and only to tell human
                  visitors from bots. We treat this as <strong>strictly necessary</strong> for a
                  service you asked for, which is why it is not subject to a consent prompt. It is
                  not used to profile or track you across the web.
                </p>
                <p>
                  Our web fonts are served from this site, not from Google, so loading a page sends
                  no request to Google Fonts.
                </p>

                <h2>People featured on this site</h2>
                <p>
                  Our <a href="/community/">community pages</a> list organizers and speakers with
                  their name, photo, job title, employer, bio and links to their public profiles, so
                  visitors can see who runs the meetup and who has spoken at it. Event pages may
                  also include <strong>photographs taken at our meetups</strong>, in which attendees
                  can be recognisable.
                </p>
                <p>
                  If you appear anywhere on this site and you want your entry or a photograph{' '}
                  <strong>corrected or removed</strong>, email us at{' '}
                  {email ? (
                    <a href={`mailto:${email}`}>{email}</a>
                  ) : (
                    <span>our contact address</span>
                  )}{' '}
                  and we will act on it promptly. You do not need to give a reason.
                </p>
                <p>
                  If you apply to speak using our speaker form, that form is a{' '}
                  <strong>Google Form</strong> and your answers are handled by Google on our behalf.
                </p>

                <h2>Your rights</h2>
                <p>Under the GDPR you have the right to:</p>
                <ul>
                  <li>ask what personal data of yours we hold, and get a copy of it</li>
                  <li>have inaccurate data corrected</li>
                  <li>have your data erased</li>
                  <li>restrict or object to how we use it</li>
                  <li>receive it in a portable format</li>
                </ul>
                <p>
                  To exercise any of these, email{' '}
                  {email ? (
                    <a href={`mailto:${email}`}>{email}</a>
                  ) : (
                    <span>our contact address</span>
                  )}
                  . There is no form to fill in and no charge.
                </p>
                <p>
                  If you think we have handled your data badly, you can complain to the Greek
                  supervisory authority, the{' '}
                  <ExternalLink href="https://www.dpa.gr/en">
                    Hellenic Data Protection Authority (ΑΠΔΠΧ)
                  </ExternalLink>
                  .
                </p>

                <h2>Changes to this page</h2>
                <p>
                  If we add or remove a service that handles personal data, we will update this page
                  to match. Last updated: <strong>{LAST_UPDATED}</strong>.
                </p>
              </div>
              <div className="h-2 bg-gradient-to-r from-js-yellow via-yellow-400 to-js-yellow" />
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
