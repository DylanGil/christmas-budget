import Link from "next/link";
import AuthButton from "../AuthButton";
import { ToggleTheme } from "../ToggleTheme";

export const Header = () => {
  return (
    <header className="mb-5 flex w-full border-b">
      {/* border-b border-muted shadow-sm */}
      <div className="flex w-full items-center justify-start">
        <p
          className="
              cursor-pointer transition-colors duration-200
              hover:text-primary"
        >
          <Link href="/">
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
