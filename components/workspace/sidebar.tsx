import { Inbox } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewCollectionDialog from "@/components/workspace/new-collection-dialog";

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r bg-surface">
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between px-3 py-2.5">
          <span className="font-bold text-text-subtle text-xs uppercase tracking-wider">
            Collections
          </span>

          <NewCollectionDialog />
        </div>

        <div className="min-h-screen overflow-hidden">
          <ScrollArea>
            <div className="px-1.5 pb-4">
              <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                <Inbox className="text-text-disabled" size={28} />
                <span className="mt-2 text-text-subtle text-xs">
                  No collections yet
                </span>

                <NewCollectionDialog isWide={true} />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
