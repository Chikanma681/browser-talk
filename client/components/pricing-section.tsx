import { Button } from "@/components/ui/button"

const pricingTiers = [
  {
    country: "United States",
    flag: "🇺🇸",
    price: "0.01",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    price: "0.02",
  },
  {
    country: "India",
    flag: "🇮🇳",
    price: "0.01",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    price: "0.02",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    price: "0.02",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    price: "0.03",
  },
]

export function PricingSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl">Transparent Pricing</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See exactly what you'll pay per minute to popular destinations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
        {pricingTiers.map((tier) => (
          <div
            key={tier.country}
            className="rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tier.flag}</span>
                <span className="font-semibold text-foreground">{tier.country}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary">${tier.price}</span>
              <span className="text-sm text-muted-foreground">/min</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
          View All Rates
        </Button>
      </div>
    </section>
  )
}
