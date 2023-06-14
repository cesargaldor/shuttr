"use client";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, MoonIcon, SunIcon } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Skeleton } from "./ui/skeleton";

const themes: { value: string; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState<string>(theme as string);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {!mounted ? (
        <Skeleton className="w-[110px] h-6" />
      ) : (
        <Popover
          open={open}
          onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-fit flex items-center gap-2 justify-between font-semibold">
              {theme === themes[0].value ? <SunIcon className="w-3 h-3" /> : <MoonIcon className="w-3 h-3" />}
              <span className="text-xs">{themes.find((t) => t.value === value)?.label}</span>
              <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[110px] p-0 text-xs">
            <Command>
              <CommandGroup className="text-xs">
                {themes.map((theme) => (
                  <CommandItem
                    className="text-xs"
                    key={theme.value}
                    onSelect={(currentValue) => {
                      const theme = themes.find((t) => t.label.toLowerCase() === currentValue);
                      setValue(theme?.value as string);
                      setTheme(theme?.value as string);
                      setOpen(false);
                    }}>
                    <Check className={cn("mr-2 h-4 w-4", value === theme.value ? "opacity-100" : "opacity-0")} />
                    {theme.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default ThemeSwitcher;
