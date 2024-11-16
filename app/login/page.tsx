import { isAuth } from "@/components/isAuth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  return (await isAuth()) ? (
    redirect("/")
  ) : (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
