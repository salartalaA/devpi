"use client";

import { CornerDownLeft, FilePlus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface CommandItemData {
  description: string;
  id: string;
  method?: string;
  status?: "success" | "error";
  title: string;
  type: "action" | "request";
}

const commands: CommandItemData[] = [
  {
    description: "Open a blank request",
    id: "new-request",
    title: "New Request Tab",
    type: "action",
  },
  {
    description: "Create a new collection",
    id: "new-collection",
    title: "New Collection",
    type: "action",
  },
  {
    description: "200",
    id: "jsonplaceholder",
    method: "GET",
    status: "success",
    title: "https://jsonplaceholder.typicode.com/todos",
    type: "request",
  },

  {
    description: "Error",
    id: "localhost-typo",
    method: "GET",
    status: "error",
    title: "http://localhst:3000/api/users",
    type: "request",
  },
];

export default function CommandPalette() {
  const [openState, setOpenState] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenState((previous) => !previous);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  const handleSelect = (id: string) => {
    const selectedCommand = commands.find((command) => command.id === id);

    if (!selectedCommand) {
      return;
    }

    // TODO:
    // Execute the selected command here.
    //
    // Example:
    //
    // if (selectedCommand.id === "new-request") {
    //   createNewRequest();
    // }
    //
    // if (selectedCommand.type === "request") {
    //   openRequest(selectedCommand.id);
    // }

    setOpenState(false);
  };

  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <DialogTrigger
        render={
          <Button
            className="h-8 gap-1.5 rounded-lg border-border bg-surface px-3 font-semibold text-foreground text-xs hover:bg-surface-hover"
            variant="outline"
          >
            <Search className="h-3.5 w-3.5" />

            <span>Search</span>

            <kbd className="inline-flex items-center rounded border border-border px-1 font-mono text-[0.625rem] text-text-subtle">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </Button>
        }
      />

      <DialogContent
        className="max-w-xl! gap-0 overflow-hidden rounded-lg border border-border bg-card p-0 shadow-lg"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Command Palette</DialogTitle>

        <Command className="bg-transparent">
          {/* Search */}
          <div className="border-border border-b">
            <CommandInput
              className="h-12 border-0"
              placeholder="Search requests, collections, history…"
            />

            <kbd className="pointer-events-none absolute top-4 right-4 rounded border border-border px-1.5 py-0.5 font-mono text-[0.625rem] text-text-subtle">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <CommandList className="max-h-[400px]">
            <CommandEmpty className="py-6 text-center text-text-subtle text-xs">
              No results found.
            </CommandEmpty>

            <CommandGroup className="p-1">
              {commands.map((command) => {
                const isAction = command.type === "action";

                return (
                  <CommandItem
                    className="group gap-2.5 px-3 py-2 data-[selected=true]:bg-primary-subtle"
                    key={command.id}
                    onSelect={() => handleSelect(command.id)}
                    value={`${command.title} ${command.description}`}
                  >
                    {/* Icon / Method */}
                    {isAction ? (
                      <span className="flex w-4 shrink-0 justify-center">
                        <FilePlus
                          className="text-accent-lime"
                          height={14}
                          width={14}
                        />
                      </span>
                    ) : (
                      <span className="w-8 shrink-0 text-center font-bold text-[0.625rem] text-success">
                        {command.method}
                      </span>
                    )}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground text-xs">
                        {command.title}
                      </span>

                      <span className="block truncate text-[0.625rem] text-text-subtle">
                        {command.description}
                      </span>
                    </div>

                    {/* Status */}
                    {command.status === "success" && (
                      <span className="shrink-0 font-mono text-[0.625rem] text-success">
                        200
                      </span>
                    )}

                    {command.status === "error" && (
                      <span className="shrink-0 font-mono text-[0.625rem] text-text-subtle">
                        Error
                      </span>
                    )}

                    {/* Enter */}
                    <CornerDownLeft
                      className="hidden shrink-0 text-primary! group-data-[selected=true]:block"
                      height={12}
                      width={12}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Footer */}
        <DialogFooter className="border-border border-t px-10 pt-2 pb-6">
          <div className="flex w-full items-center justify-between text-[0.625rem] text-text-subtle">
            <span className="flex items-center gap-1">
              <CornerDownLeft height={10} width={10} />
              to select
            </span>

            <span>↑↓ to navigate</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
