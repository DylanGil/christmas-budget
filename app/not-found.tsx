import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-black">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4">La page que vous cherchez n&apos;existe pas.</p>

        <Button asChild variant={"default"}>
          <Link href="/">Se connecter / S&apos;inscrire</Link>
        </Button>
      </div>
    </div>
  );
}
