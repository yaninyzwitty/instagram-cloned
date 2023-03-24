"use client";

import { useSession } from "next-auth/react";
import { userArray } from "../users";
import Story from "./Story";

function Stories() {
  const { data: session } = useSession();
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      <Story username={session?.user?.name!} img={session?.user?.image!} />
      {userArray.map((profile, idx) => (
        <Story key={idx} username={profile.userName} img={profile.profilePic} />
      ))}
    </div>
  );
}

export default Stories;
