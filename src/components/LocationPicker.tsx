import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export interface LocationType {
  county: string;
  state: string;
  label: string;
}

interface LocationPickerProps {
  location: LocationType | null;
  getLocation: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  getLocation,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="hidden md:flex items-center gap-2 cursor-pointer select-none text-foreground
                     max-w-[260px] px-3 py-1 rounded-md hover:bg-accent transition"
          aria-label="Change location"
          type="button"
        >
          <MapPin className="text-primary h-4 w-4" />

          <span className="flex flex-col leading-tight max-w-[180px]">
            {location ? (
              <>
                {/* County */}
                <span className="text-sm text-foreground truncate break-words">
                  {location.county}
                </span>

                {/* State */}
                <span className="text-xs text-muted-foreground truncate break-words">
                  {location.state}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground text-sm">Add address</span>
            )}
          </span>

          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-0">
        <div className="p-3">
          <h3 className="text-sm font-medium text-foreground mb-2">
            Change location
          </h3>

          {location && (
            <p className="text-xs text-muted-foreground mb-2 leading-snug">
              Current:{" "}
              <span className="font-semibold text-foreground">
                {location.label}
              </span>
            </p>
          )}

          <Command>
            <CommandInput placeholder="Search location or choose an action..." />

            <CommandGroup heading="Quick actions">
              <CommandItem
                onSelect={() => {
                  getLocation();
                  setOpen(false);
                }}
              >
                📍 Detect my location
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Recent / Example">
              <CommandItem onSelect={() => setOpen(false)}>
                New York, NY
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Los Angeles, CA
              </CommandItem>
            </CommandGroup>
          </Command>

          <div className="mt-3">
            <Button
              onClick={() => {
                getLocation();
                setOpen(false);
              }}
              className="w-full"
            >
              Detect my location
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationPicker