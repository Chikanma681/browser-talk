import { Button } from "@/components/ui/button"
import { Menu, Sun } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-mono text-xl font-bold text-primary-foreground">BT</span>
          </div>
          <span className="font-mono text-xl font-semibold text-primary">BrowserTalk</span>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Make a call</Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
