import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Delete } from "lucide-react"
import { PhoneInput } from "./phone-input"

const dialPad = [
  { number: "1", letters: "" },
  { number: "2", letters: "ABC" },
  { number: "3", letters: "DEF" },
  { number: "4", letters: "GHI" },
  { number: "5", letters: "JKL" },
  { number: "6", letters: "MNO" },
  { number: "7", letters: "PQRS" },
  { number: "8", letters: "TUV" },
  { number: "9", letters: "WXYZ" },
  { number: "*", letters: "" },
  { number: "0", letters: "+" },
  { number: "#", letters: "" },
]

export function PhoneDialer() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [disabled, setDisabled] = useState(false)

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num)
  }

  const handleClear = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }
  
  const handleClearAll = () => {
    const defaultDialCode = "+1";
    setPhoneNumber(defaultDialCode);
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl border border-border/50">
      <div className="space-y-6">
          <div className="flex justify-end">
            <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
          </div>

        <div className="space-y-3">
          <PhoneInput 
            value={phoneNumber}
            setDisabled={setDisabled}
            onChange={(value) => setPhoneNumber(value || "")}
            placeholder="Enter a phone number..."
            defaultCountry="US"
            showValidation={true}
            className="w-full"
          /> 
        </div>
        <div className="grid grid-cols-3 gap-3">
          {dialPad.map((key) => (
            <Button
              key={key.number}
              onClick={() => handleNumberClick(key.number)}
              className="h-20 flex-col gap-0 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground"
              variant="ghost"
            >
              <span className="text-2xl font-semibold">{key.number}</span>
              {key.letters && <span className="text-xs text-muted-foreground">{key.letters}</span>}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="ghost" className="h-16 rounded-2xl bg-secondary hover:bg-secondary/80" onClick={handleClearAll}>
            Clear All
          </Button>

          <Button size="icon" className="h-16 w-full rounded-2xl bg-accent hover:bg-primary/90" disabled={disabled}>
            <Phone className="h-6 w-6 text-primary-foreground" />
          </Button>

          <Button variant="ghost" onClick={handleClear} className="h-16 rounded-2xl bg-secondary hover:bg-secondary/80">
            <Delete className="h-4 w-4 text-2xl text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
