import { mmcLogo } from "@/assets";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="bg-black text-primary px-4 lg:px-6 h-28 flex items-center justify-between">
        <div className="flex items-center flex-col md:flex-row">
          <Link to="/" className="flex items-center justify-center p-2">
            <img src={mmcLogo} className="w-28" />
          </Link>
          <span className="flex flex-col ">
            <span className="text-sm md:text-base lg:text-xl">
              Momo Mates Creations
            </span>
            <span className="text-xs">Partner Portal</span>
          </span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-10 max-sm:hidden text-sm md:text-base lg:text-xl items-center"></nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-shadeColor mt-auto">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Momo Mates Creations. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/tnc"
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
