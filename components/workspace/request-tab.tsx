import { Plus, X } from "lucide-react";

export default function RequestTab() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="overflow-x-auto! flex h-9 shrink-0 items-center gap-0.5 overflow-hidden border-border border-b bg-surface/60 px-2">
        <div className="group flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-t-md border-primary border-b-2 bg-surface px-3 py-1.5">
          <span className="w-8 text-center font-bold text-[0.7rem] text-success">
            GET
          </span>

          <span className="max-w-32 truncate text-foreground text-xs">
            New Request
          </span>

          <button
            className="rounded p-0.5 opacity-0 transition-opacity hover:bg-surface-active group-hover:opacity-100"
            type="button"
          >
            <X className="text-foreground" size={10} />
          </button>
        </div>

        <Plus className="mx-2 cursor-pointer text-text-subtle" size={14} />
      </div>
    </div>
  );
}
