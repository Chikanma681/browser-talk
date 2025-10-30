import { Globe, Shield, Zap, CreditCard } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Call over 200 countries and territories with crystal-clear quality",
  },
  {
    icon: Zap,
    title: "Instant Connection",
    description: "No downloads, no setup. Start calling in seconds from any browser",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "End-to-end encrypted calls with enterprise-grade security",
  },
  {
    icon: CreditCard,
    title: "Pay As You Go",
    description: "Only pay for what you use. No monthly fees or hidden charges",
  },
]

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold text-primary md:text-4xl lg:text-5xl">Why Choose BrowserTalk?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The modern way to make international calls without the hassle
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
