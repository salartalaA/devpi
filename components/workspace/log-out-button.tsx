"use client";

import { LogOut } from "lucide-react";
import { logOutUser } from "@/server/actions/auth";

export default function LogOutButton() {
  const handleLogOut = async () => {
    await logOutUser();
  };

  return (
    <button onClick={handleLogOut} type="button">
      <LogOut className="text-white" size={14} />
    </button>
  );
}
