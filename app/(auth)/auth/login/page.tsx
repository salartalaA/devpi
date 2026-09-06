import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/actions/auth";
import LoginPage from "./_login";

export default async function Login() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/");
  }

  return <LoginPage />;
}
