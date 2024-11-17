import { isAuth } from "@/components/isAuth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  return (await isAuth()) ? (
    redirect("/")
  ) : (
    <div className="flex flex-1 items-center justify-center">
      <LoginForm />
    </div>
  );
}
