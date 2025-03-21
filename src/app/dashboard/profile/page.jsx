import { fetchUser } from "@/app/lib/data/user";
import UserProfileDetails from "@/app/ui/users/profile";
import Link from "next/link";
import React from "react";

const UserProfilePage = async ({ searchParams }) => {
  const success = (await searchParams).success;
  console.log("password change: ", success);
  const user = await fetchUser();
  return (
    <div className="relative">
      {success && (
        <div className="absolute w-full p-4 bg-blue-400 flex items-center justify-between">
          <p>password changed successfully!</p>
          <Link href="/dashboard/profile">x</Link>
        </div>
      )}
      <h1>User Profile</h1>
      <UserProfileDetails user={user} />
    </div>
  );
};

export default UserProfilePage;
