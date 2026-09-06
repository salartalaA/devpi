"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function NewCollectionDialog({
  isWide = false,
}: {
  isWide?: boolean;
}) {
  const [collectionName, setCollectionName] = useState<string>("");
  const [openState, setOpenState] = useState(false);

  const handleCancel = () => {
    setOpenState(false);
    setCollectionName("");
  };

  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <DialogTrigger
        render={
          isWide ? (
            <Button className="mt-3 bg-transparent text-sm" variant="outline">
              <Plus size={14} />
              New collection
            </Button>
          ) : (
            <button className="m-1.5" type="button">
              <Plus size={14} />
            </button>
          )
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New collection</DialogTitle>
        </DialogHeader>
        <Input
          autoComplete="off"
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Collection 1"
          type="text"
          value={collectionName}
        />

        <DialogFooter>
          <Button onClick={handleCancel} variant="ghost">
            Cancel
          </Button>
          <Button disabled={collectionName.trim().length === 0}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
