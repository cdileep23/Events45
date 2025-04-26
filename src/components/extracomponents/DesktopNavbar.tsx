"use client";

import { BellIcon, HomeIcon, Ticket, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function DesktopNavbar() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  
  const isLinkActive = (path:string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button 
        variant="ghost" 
        className={`flex items-center gap-2 ${
          isLinkActive('/') 
            ? 'text-blue-600 bg-blue-50' 
            : 'text-gray-700 hover:text-blue-600'
        }`} 
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      
      {isSignedIn ? (
        <>
          <Button 
            variant="ghost" 
            className={`flex items-center gap-2 ${
              isLinkActive('/profile') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600'
            }`} 
            asChild
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex items-center gap-2 ${
              isLinkActive('/events') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600'
            }`} 
            asChild
          >
            <Link href="/events/create">
              <Ticket className="w-4 h-4" />
              <span className="hidden lg:inline"> Create Event</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;