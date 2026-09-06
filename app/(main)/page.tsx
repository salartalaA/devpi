import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/actions/auth";

export default async function WorkSpace() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/auth/login");
  }

  return null;
}
