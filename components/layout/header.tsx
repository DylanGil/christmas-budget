import { Pinyon_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "../AuthButton";
import { ToggleTheme } from "../ToggleTheme";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
});

export const Header = () => {
  return (
    <header className="mb-5 flex w-full border-b border-white">
      <div className="flex w-full items-center justify-start">
        <p
          className="
              ml-5 cursor-pointer transition-colors duration-200 hover:text-primary sm:text-3xl"
        >
          <Link
            href="/"
            className={`${pinyonScript.className} relative flex flex-col items-start`}
          >
            <strong className="relative z-10">Budget de Noël</strong>
            <Image
              src="/images/hat.png"
              alt="Christmas Budget"
              width={50}
              height={50}
              className="absolute -left-4 -top-4 z-0"
              style={{ transform: "rotate(-15deg)" }}
            />
          </Link>
        </p>
      </div>
      <div className="flex w-full items-center justify-end p-4">
        <AuthButton />
        <ToggleTheme />
      </div>
    </header>
  );
};
