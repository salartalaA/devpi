"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request-store";
import type { RequestMethod } from "@/types";

interface Method {
  className: string;
  title: RequestMethod;
}

export const METHODS: Method[] = [
  { className: "text-success", title: "GET" },
  { className: "text-accent-lime", title: "POST" },
  { className: "text-info", title: "PUT" },
  { className: "text-warning", title: "PATCH" },
  { className: "text-error", title: "DELETE" },
];

export default function RequestMethodCombobox() {
  const requests = useRequestStore((state) => state.requests);

  const activeRequestId = useRequestStore((state) => state.activeRequestId);

  const activeRequest = requests.find((req) => req.id === activeRequestId);

  const updateRequest = useRequestStore((state) => state.updateRequest);

  const selectedMethodClassName = METHODS.find(
    (method) => method.title === activeRequest?.method
  )?.className;

  return (
    <Combobox
      items={METHODS}
      itemToStringValue={(method) => method}
      onValueChange={(method) =>
        updateRequest(activeRequestId as string, {
          method: method as RequestMethod,
        })
      }
      value={activeRequest?.method}
    >
      <ComboboxInput
        className={cn(selectedMethodClassName, "h-9")}
        placeholder="Choose a method"
      />

      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {(item: Method) => (
            <ComboboxItem
              className={item.className}
              key={item.title}
              value={item.title}
            >
              {item.title}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
