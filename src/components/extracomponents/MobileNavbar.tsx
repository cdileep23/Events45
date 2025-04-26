"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  Ticket,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  
  const isLinkActive = (path:string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  
  return (
    <div className="flex md:hidden items-center space-x-2">
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-white">
          <SheetHeader>
            <SheetTitle className="text-blue-600">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button 
              variant="ghost" 
              className={`flex items-center gap-3 justify-start ${
                isLinkActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`} 
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            
            {isSignedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-3 justify-start ${
                    isLinkActive('/profile') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`} 
                  asChild
                >
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-3 justify-start ${
                    isLinkActive('/event') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`} 
                  asChild
                >
                  <Link href="/event/create">
                    <Ticket className="w-4 h-4" />
                   Create Event
                  </Link>
                </Button>
                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start w-full text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;