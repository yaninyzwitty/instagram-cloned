"use client";
import Image from "next/image";
import { modalState } from "@/app/Atoms/modalState";
import { useRecoilState } from "recoil";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto ">
        <div
          onClick={() => router.push("/")}
          className="hidden lg:inline-grid relative w-24  cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            alt="instagram"
            fill
            className="object-contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            alt="instagram"
            fill
            className="object-contain"
          />
        </div>

        <div className="max-w-xl">
          <div className="mt-1 relative p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm focus:ring-black focus:border-black  rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navButton" />
          <Bars3Icon className="h-6 md:hidden cursor-pointer" />
          {session ? (
            <>
              <div className="relative navButton">
                <PaperAirplaneIcon className="navButton -rotate-45" />
                <div className="absolute -top-3 -right-2 text-sm w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navButton"
              />
              <UserGroupIcon className="navButton" />
              <HeartIcon className="navButton" />
              <img
                onClick={() => signOut()}
                className="h-10 w-10 rounded-full cursor-pointer"
                src={session.user?.image!}
                alt="profile_pic"
              />
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
