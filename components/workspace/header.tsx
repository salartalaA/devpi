import { Boxes, FlaskConical, History } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EnvCombobox from "@/components/workspace/env-combobox";
import LogOutButton from "@/components/workspace/log-out-button";
import SearchHistory from "@/components/workspace/search-dialog";
import { getCurrentUser } from "@/server/actions/auth";

export default async function Header() {
  const currentUserEmail = (await getCurrentUser())?.email;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-border border-b bg-surface px-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Boxes size={16} />
          </div>
          <span className="font-bold text-base text-foreground tracking-tight">
            DevBox
          </span>
        </Link>

        <span className="font-semibold text-muted-foreground text-xs">
          API Client
        </span>
      </div>

      {/* Options */}
      <div className="flex items-center gap-2">
        <EnvCombobox />

        <SearchHistory />

        <Button className="bg-subtle" variant="outline">
          <Link className="flex items-center gap-2" href="/enviroments">
            <span>
              <FlaskConical size={14} />
            </span>
            Enivronments
          </Link>
        </Button>

        <Button className="bg-subtle" variant="outline">
          <Link className="flex items-center gap-2" href="/history">
            <span>
              <History size={14} />
            </span>
            History
          </Link>
        </Button>

        <div className="mx-1 h-6 w-px shrink-0 bg-border" />

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {currentUserEmail}
          </span>

          <LogOutButton />
        </div>
      </div>
    </header>
  );
}
