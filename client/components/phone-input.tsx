"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const validateE164 = (phoneNumber: string): boolean => {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
};

export const formatE164 = (phoneNumber: string): string => {
  return phoneNumber.replace(/[^\d+]/g, '').slice(0, 16);
};

const countryCodes = [
  { code: "AF", dial: "+93", name: "Afghanistan" },
  { code: "AL", dial: "+355", name: "Albania" },
  { code: "DZ", dial: "+213", name: "Algeria" },
  { code: "AD", dial: "+376", name: "Andorra" },
  { code: "AO", dial: "+244", name: "Angola" },
  { code: "AR", dial: "+54", name: "Argentina" },
  { code: "AM", dial: "+374", name: "Armenia" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "AT", dial: "+43", name: "Austria" },
  { code: "AZ", dial: "+994", name: "Azerbaijan" },
  { code: "BH", dial: "+973", name: "Bahrain" },
  { code: "BD", dial: "+880", name: "Bangladesh" },
  { code: "BY", dial: "+375", name: "Belarus" },
  { code: "BE", dial: "+32", name: "Belgium" },
  { code: "BZ", dial: "+501", name: "Belize" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "BG", dial: "+359", name: "Bulgaria" },
  { code: "KH", dial: "+855", name: "Cambodia" },
  { code: "CM", dial: "+237", name: "Cameroon" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "CN", dial: "+86", name: "China" },
  { code: "CO", dial: "+57", name: "Colombia" },
  { code: "CR", dial: "+506", name: "Costa Rica" },
  { code: "HR", dial: "+385", name: "Croatia" },
  { code: "CU", dial: "+53", name: "Cuba" },
  { code: "CY", dial: "+357", name: "Cyprus" },
  { code: "CZ", dial: "+420", name: "Czech Republic" },
  { code: "DK", dial: "+45", name: "Denmark" },
  { code: "EC", dial: "+593", name: "Ecuador" },
  { code: "EG", dial: "+20", name: "Egypt" },
  { code: "SV", dial: "+503", name: "El Salvador" },
  { code: "EE", dial: "+372", name: "Estonia" },
  { code: "ET", dial: "+251", name: "Ethiopia" },
  { code: "FI", dial: "+358", name: "Finland" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "GE", dial: "+995", name: "Georgia" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "GH", dial: "+233", name: "Ghana" },
  { code: "GR", dial: "+30", name: "Greece" },
  { code: "GT", dial: "+502", name: "Guatemala" },
  { code: "HN", dial: "+504", name: "Honduras" },
  { code: "HK", dial: "+852", name: "Hong Kong" },
  { code: "HU", dial: "+36", name: "Hungary" },
  { code: "IS", dial: "+354", name: "Iceland" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "ID", dial: "+62", name: "Indonesia" },
  { code: "IR", dial: "+98", name: "Iran" },
  { code: "IQ", dial: "+964", name: "Iraq" },
  { code: "IE", dial: "+353", name: "Ireland" },
  { code: "IL", dial: "+972", name: "Israel" },
  { code: "IT", dial: "+39", name: "Italy" },
  { code: "JM", dial: "+1876", name: "Jamaica" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "JO", dial: "+962", name: "Jordan" },
  { code: "KZ", dial: "+7", name: "Kazakhstan" },
  { code: "KE", dial: "+254", name: "Kenya" },
  { code: "KR", dial: "+82", name: "South Korea" },
  { code: "KW", dial: "+965", name: "Kuwait" },
  { code: "LB", dial: "+961", name: "Lebanon" },
  { code: "LY", dial: "+218", name: "Libya" },
  { code: "MY", dial: "+60", name: "Malaysia" },
  { code: "MX", dial: "+52", name: "Mexico" },
  { code: "MA", dial: "+212", name: "Morocco" },
  { code: "NL", dial: "+31", name: "Netherlands" },
  { code: "NZ", dial: "+64", name: "New Zealand" },
  { code: "NG", dial: "+234", name: "Nigeria" },
  { code: "NO", dial: "+47", name: "Norway" },
  { code: "PK", dial: "+92", name: "Pakistan" },
  { code: "PA", dial: "+507", name: "Panama" },
  { code: "PE", dial: "+51", name: "Peru" },
  { code: "PH", dial: "+63", name: "Philippines" },
  { code: "PL", dial: "+48", name: "Poland" },
  { code: "PT", dial: "+351", name: "Portugal" },
  { code: "QA", dial: "+974", name: "Qatar" },
  { code: "RO", dial: "+40", name: "Romania" },
  { code: "RU", dial: "+7", name: "Russia" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "SG", dial: "+65", name: "Singapore" },
  { code: "ZA", dial: "+27", name: "South Africa" },
  { code: "ES", dial: "+34", name: "Spain" },
  { code: "SE", dial: "+46", name: "Sweden" },
  { code: "CH", dial: "+41", name: "Switzerland" },
  { code: "TW", dial: "+886", name: "Taiwan" },
  { code: "TH", dial: "+66", name: "Thailand" },
  { code: "TR", dial: "+90", name: "Turkey" },
  { code: "AE", dial: "+971", name: "United Arab Emirates" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "UY", dial: "+598", name: "Uruguay" },
  { code: "VE", dial: "+58", name: "Venezuela" },
  { code: "VN", dial: "+84", name: "Vietnam" },
].sort((a, b) => a.name.localeCompare(b.name));

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  showValidation?: boolean;
  setDisabled: (disabled: boolean) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ setDisabled, className, onChange, value = "", defaultCountry = "US", showValidation = false, ...props }, ref) => {
    const [countryCode, setCountryCode] = React.useState(defaultCountry.toUpperCase());
    const isInitialMount = React.useRef(true);
    const isValid = value ? validateE164(value) : false;

    React.useEffect(() => {
      if (isInitialMount.current && !value) {
        const defaultCountryData = countryCodes.find((c) => c.code === defaultCountry.toUpperCase());
        if (defaultCountryData) {
          onChange?.(defaultCountryData.dial);
        }
        isInitialMount.current = false;
      }
    }, []);

    React.useEffect(() => {
      if (value) {
        const matchingCountry = countryCodes.find((c) => value.startsWith(c.dial));
        if (matchingCountry) {
          setCountryCode(matchingCountry.code);
        }
      }

      if (!validateE164(value)) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }, [value]);

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newNumber = e.target.value;
      
      newNumber = newNumber.replace(/[^\d+]/g, '');
      
      if (!newNumber.startsWith('+')) {
        const currentCountry = countryCodes.find((c) => c.code === countryCode);
        if (currentCountry && !newNumber.startsWith(currentCountry.dial.slice(1))) {
          newNumber = currentCountry.dial + newNumber;
        } else {
          newNumber = '+' + newNumber;
        }
      }
      
      if (newNumber.length > 16) {
        newNumber = newNumber.slice(0, 16);
      }
      
      onChange?.(newNumber);
    };

    const handleCountryChange = (code: string) => {
      setCountryCode(code);
      const selectedCountry = countryCodes.find((c) => c.code === code);
      
      if (selectedCountry) {
        const oldCountry = countryCodes.find((c) => c.code === countryCode);
        let newPhoneNumber = value;
        
        if (oldCountry && value.startsWith(oldCountry.dial)) {
          newPhoneNumber = selectedCountry.dial + value.slice(oldCountry.dial.length);
        } else if (!value || value === oldCountry?.dial) {
          newPhoneNumber = selectedCountry.dial;
        } else {
          newPhoneNumber = selectedCountry.dial + value.replace(/^\+/, '');
        }
        
        onChange?.(newPhoneNumber);
      }
    };

      return (
      <div className="flex flex-col gap-1">
        <div className="flex">
          <CountrySelect
            value={countryCode}
            onChange={handleCountryChange}
          />
          <Input
            ref={ref}
            type="tel"
            value={value}
            onChange={handlePhoneNumberChange}
            className={cn(
              "rounded-e-lg rounded-s-none h-14 text-lg",
              showValidation && value.length > 3 && !isValid && "border-red-500 focus-visible:ring-red-500",
              showValidation && isValid && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            {...props}
          />
        </div>
        {showValidation && value.length > 3 && (
          <p className={cn(
            "text-xs px-1",
            isValid ? "text-green-600" : "text-red-600"
          )}>
            {isValid 
              ? "✓ Valid E.164 format" 
              : "⚠ Must be +[country][number] (max 15 digits)"}
          </p>
        )}
      </div>
      );
  }
  );
PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: string;
  onChange: (country: string) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, onChange }: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 h-14 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryCodes.map((country) => (
                    <CountrySelectOption
                    key={country.code}
                    country={country}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onClose={() => setOpen(false)}
                    />
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps {
  country: { code: string; dial: string; name: string };
  selectedCountry: string;
  onChange: (country: string) => void;
  onClose: () => void;
}

const CountrySelectOption = ({
  country,
  selectedCountry,
  onChange,
  onClose,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country.code);
    onClose();
  };
  
  return (
    <CommandItem 
      className="gap-2 cursor-pointer" 
      onSelect={handleSelect}
      value={`${country.code}-${country.name}`}
    >
      <FlagComponent country={country.code} />
      <span className="flex-1 text-sm">{country.name}</span>
      <span className="text-sm text-foreground/50">{country.dial}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country.code === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country }: { country: string }) => {
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 items-center justify-center text-base">
      {getFlagEmoji(country)}
    </span>
  );
};

export { PhoneInput };