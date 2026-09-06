"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Method {
  className: string;
  title: RequestMethod;
}

const METHODS: Method[] = [
  { className: "text-success", title: "GET" },
  { className: "text-accent-lime", title: "POST" },
  { className: "text-info", title: "PUT" },
  { className: "text-warning", title: "PATCH" },
  { className: "text-error", title: "DELETE" },
];

export default function RequestMethodCombobox() {
  const [selectedMethod, setSelectedMethod] = useState<RequestMethod | null>(
    "GET"
  );

  const selectedMethodClassName = METHODS.find(
    (method) => method.title === selectedMethod
  )?.className;

  return (
    <Combobox
      items={METHODS}
      itemToStringValue={(method) => method}
      onValueChange={(value) => setSelectedMethod(value)}
      value={selectedMethod}
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
