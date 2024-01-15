import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@/core/ui/NavigationMenu';
import { ModeToggle } from './theme-toggler';
import { Button } from '@/core/ui/button';
import { ChevronDown, Menu, Settings, LayoutGrid, LogOut, Brush } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/core/ui/dropdown-menu";
import { ModeDropdown } from './theme-toggler';
import { useAuth } from 'reactfire';
import { useSignOut } from '@/lib/auth/hooks/useSignOut';

const links = {
  SignIn: {
    label: 'Sign In',
    path: '/auth/sign-in',
  },
  Blog: {
    label: 'Blog',
    path: '/blog',
  },
  Docs: {
    label: 'Docs',
    path: '/docs',
  },
  Pricing: {
    label: 'Pricing',
    path: '/pricing',
  },
  FAQ: {
    label: 'FAQ',
    path: '/faq',
  },
  NewPage: {
    label: 'New Page',
    path: '/new-page',
  },
};

export const Navbar = () => {
  const auth = useAuth();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-5">
        <div className="flex py-1.5 px-1 items-center border-b border-gray-50 dark:border-dark-800/50 justify-between">
          <div className="w-4/12">
            <Link href={"/"} className="text-2xl text-primary-600">MakerKit</Link>
          </div>
          <div className="w-4/12 hidden lg:flex justify-center">
            <div className="hidden items-center lg:flex">
              <NavigationMenu>
                <NavigationMenuItem
                  className={'flex lg:hidden'}
                  link={links.SignIn}
                />
              
                <NavigationMenuItem link={links.Blog} />
                <NavigationMenuItem link={links.Docs} />
                <NavigationMenuItem link={links.Pricing} />
                <NavigationMenuItem link={links.FAQ} />
              </NavigationMenu>
            </div>
            <div className="ml-4 flex items-center lg:hidden">

            </div>
          </div>
          <div className="flex items-center space-x-4 w-4/12 justify-end">
            <div>
              <ModeToggle />
            </div>
            {!user
            ? <div className="hidden space-x-2 lg:flex">
                <Button className="rounded-full" variant="ghost">
                  <Link href={"/auth/sign-in"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <span>Sign In</span>
                    </span>
                  </Link>
                </Button>
                <Button className="rounded-full">
                  <Link href={"/auth/sign-up"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <span>Sign Up</span>
                      <ChevronDown className="h-4 w-4 -rotate-90 scale-100 transition-all ms-2" />
                    </span>
                  </Link>
                </Button>
              </div>
              :
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex cursor-pointer focus:outline-none group items-center">
                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full mx-auto">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-primary font-semibold uppercase text-primary-foreground">
                        {user.isAnonymous ? "A" : user.email && user.email[0]}
                      </span>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="mt-5 me-6">
                  <NavbarDropdown />
                </DropdownMenuContent>
              </DropdownMenu>}
            <div className="flex lg:hidden">
              <div className="ml-4 flex items-center lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Menu className="h-8 w-8" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem className="py-1">
                      <NavigationMenuItem link={links.SignIn} />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-1">
                      <NavigationMenuItem link={links.Blog} />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-1">
                      <NavigationMenuItem link={links.Docs} />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-1">
                      <NavigationMenuItem link={links.Pricing} />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-1">
                      <NavigationMenuItem link={links.FAQ} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const NavbarDropdown = () => {
  const router = useRouter();

  const auth = useAuth();
  const [signOutReq, state] = useSignOut();

  useEffect(() => {
    if (state.success) {
      router.replace("/auth/sign-in");
    }
  }, [state, router]);

  const onSignOutRequested = () => {
    signOutReq();
  }

  return (
    <>
      <DropdownMenuItem className="py-1 w-56">
        <div className="flex flex-col justify-start truncate text-left text-xs">
          <div className="text-gray-500 dark:text-gray-400">
            Signed in as
          </div>
          <div>
            <span className="block truncate">
              {auth?.currentUser?.isAnonymous ? "Anonymous" : auth?.currentUser?.email}
            </span>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-1">
        <Link href={"/dashboard"} className="flex h-full w-full items-center space-x-2">
          <LayoutGrid className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-1">
        <Link href={"/settings/profile"} className="flex h-full w-full items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="hidden lg:flex" />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="w-full hidden lg:flex">
          <div className="flex h-full w-full items-center space-x-2">
              <Brush className="w-4 h-4" />
              <span>Theme</span>
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="hidden lg:block">
          <ModeDropdown />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-1">
        <button className="flex h-full w-full items-center space-x-2" onClick={onSignOutRequested}>
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </DropdownMenuItem>
    </>
  );
}
