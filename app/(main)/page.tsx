import { redirect } from "next/navigation";
import Sidebar from "@/components/workspace/sidebar";
import { getCurrentUser } from "@/server/actions/auth";

export default async function WorkSpace() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex overflow-hidden">
      <Sidebar />
    </div>
  );
}
