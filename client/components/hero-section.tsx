import { Button } from "@/components/ui/button"
import { PhoneDialer } from "@/components/phone-dialer"
import { Check } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-primary md:text-6xl lg:text-7xl text-balance">
            Cheap International Calls In Your Browser
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
            Call clients, banks, government offices, or any number worldwide. Pay only for what you use. No contracts or
            hidden fees.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
              Call anyone in 🌍 →
            </Button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">From only 0.02 USD per minute!</p>
            <p className="text-sm font-semibold text-primary">First call is FREE</p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">50x cheaper than your carrier</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Crystal clear HD voice quality</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">No app download required</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneDialer />
        </div>
      </div>
    </section>
  )
}
