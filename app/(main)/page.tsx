import { redirect } from "next/navigation";
import MainSection from "@/components/workspace/main-section";
import RequestTab from "@/components/workspace/request-tab";
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

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <RequestTab />

        <MainSection />
      </main>
    </div>
  );
}
