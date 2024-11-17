import { LoginForm } from "@/components/login-form";
import { getUser } from "@/components/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  return (await getUser()) ? (
    redirect("/")
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <LoginForm />
    </div>
  );
}
