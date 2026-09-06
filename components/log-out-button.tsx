"use client";

import { LogOut } from "lucide-react";
import { logOutUser } from "@/server/actions/auth";

export default function LogOutButton() {
  const handleLogOut = async () => {
    await logOutUser();
  };

  return (
    <button
      className="rounded-lg bg-black p-2.5 text-white"
      onClick={handleLogOut}
      type="button"
    >
      <LogOut size={20} />
    </button>
  );
}
