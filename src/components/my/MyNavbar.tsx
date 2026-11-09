import Link from "next/link";
import { SignOutButton } from "../auth/SignOutButton";

interface MyNavbarProps {
  session: any;
}

export default function MyNavbar({ session }: MyNavbarProps) {
  return (
    <header className="border-b sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        {/* Logo / Brand */}
        <div className="text-lg">
          <Link href="/">Mantra</Link>
        </div>

        {/* Basic Navigation Menu (Tailwind Flex & Hover) */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-[#222744] text-muted-foreground"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-[#222744] text-muted-foreground"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="transition-colors hover:text-[#222744] text-muted-foreground"
          >
            Blog
          </Link>
        </nav>

        <div>
          {session ? (
            <SignOutButton />
          ) : (
            <Link
              className="bg-[#222744] px-5 py-3 rounded-md text-white text-sm"
              href="/login"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
