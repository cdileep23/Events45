import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";



const Header = async() => {

  return (
    <nav className="sticky top-0 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-md">
                <span className="text-white font-bold">H</span>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 h-3 w-3 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600 font-mono tracking-wider">
                  Host.in
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Event Hosting Made Simple
                </span>
              </div>
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Header;
