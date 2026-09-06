import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/actions/auth";
import RegisterPage from "./_register";

export default async function Register() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/");
  }

  return <RegisterPage />;
}
