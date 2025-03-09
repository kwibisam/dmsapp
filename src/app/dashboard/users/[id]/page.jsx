import UserDetailsContent from "@/app/ui/users/user-details-content";
import React, { Suspense } from "react";

const UserDetailsPage = async ({ params }) => {
  const userId = (await params).id;
  return (
    <Suspense fallback="please wait">
      <UserDetailsContent userId={userId} />
    </Suspense>
  );
};

export default UserDetailsPage;
