"use client";

import { Plus, X } from "lucide-react";
import { METHODS } from "@/components/workspace/req-method-combobox";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request-store";

export default function RequestTab() {
  const requests = useRequestStore((state) => state.requests);

  const activeRequestId = useRequestStore((state) => state.activeRequestId);

  const setActiveRequestId = useRequestStore((state) => state.setActiveRequest);

  const requestCreator = useRequestStore((state) => state.createRequest);

  const requestCloser = useRequestStore((state) => state.closeRequest);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="overflow-x-auto! flex h-9 shrink-0 items-center gap-0.5 overflow-hidden border-border border-b bg-surface/60 px-2">
        {requests.map((request) => (
          <button
            className={cn(
              "group flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-t-md px-3 py-1.5",
              activeRequestId === request.id &&
                "border-primary border-b-2 bg-surface"
            )}
            key={request.id}
            onClick={() => setActiveRequestId(request.id)}
            type="button"
          >
            <span
              className={cn(
                "w-8 text-center font-bold text-[0.7rem]",
                METHODS.find((method) => method.title === request.method)
                  ?.className
              )}
            >
              {request.method}
            </span>

            <span
              className={cn(
                "max-w-32 truncate text-muted-foreground text-xs",
                activeRequestId === request.id && "text-foreground"
              )}
            >
              {request.name}
            </span>

            {requests.length > 1 && (
              <X
                className="text-foreground hover:bg-surface-active group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  requestCloser(request.id);
                }}
                size={10}
              />
            )}
          </button>
        ))}

        <Plus
          className="mx-2 cursor-pointer text-text-subtle"
          onClick={() => requestCreator()}
          size={14}
        />
      </div>
    </div>
  );
}
