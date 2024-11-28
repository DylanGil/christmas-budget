import { Pinyon_Script } from "next/font/google";
import Link from "next/link";
import AuthButton from "../AuthButton";
import { ToggleTheme } from "../ToggleTheme";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
});

export const Header = () => {
  return (
    <header
      className="mb-5 flex w-full border-b"
      style={{
        backgroundImage: "url('/images/garland.png')",
        backgroundSize: "50%",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 calc(100% - 10px)",
      }}
    >
      <div className="flex w-full items-center justify-start">
        <p
          className="
              ml-5 cursor-pointer transition-colors duration-200 hover:text-primary sm:text-3xl"
        >
          <Link href="/" className={`${pinyonScript.className}`}>
            <strong>Christmas Budget</strong>
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
