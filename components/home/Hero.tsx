import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import LiquidEther from '@/components/ui/LiquidEther/LiquidEther'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 z-10 opacity-30">
        <LiquidEther
          colors={['#F7DD3E', '#FFD700', '#FFD700']}
          mouseForce={30}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={500}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[0]">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
          alt="JavaScript developers collaborating"
          fill
          className="object-cover opacity-100"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-js-black/80 via-js-black/80 to-js-black/70"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/logo.svg"
              alt="Thessaloniki JavaScript Meetup Logo"
              width={120}
              height={120}
              className="h-24 w-24 md:h-32 md:w-32"
              priority
            />
          </div>

          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Thessaloniki
            <span className="mt-2 block text-js-yellow">JavaScript Meetup</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-200 md:text-2xl">
            Join the vibrant JavaScript community in Thessaloniki. Learn, share, and connect with
            fellow developers.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/events">
              <Button variant="primary" className="w-full sm:w-auto">
                Explore Events
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" className="w-full sm:w-auto">
                Meet the Community
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-2 text-3xl font-bold text-js-yellow md:text-4xl">5+</div>
              <div className="text-sm text-gray-300 md:text-base">Meetups</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-js-yellow md:text-4xl">300+</div>
              <div className="text-sm text-gray-300 md:text-base">Members</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-js-yellow md:text-4xl">10+</div>
              <div className="text-sm text-gray-300 md:text-base">Speakers</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-js-yellow md:text-4xl">1+</div>
              <div className="text-sm text-gray-300 md:text-base">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
