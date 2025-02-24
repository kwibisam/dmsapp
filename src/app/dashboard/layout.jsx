import React from "react";
import SideNav from "../ui/dashboard/side-nav";
import { fetchUser } from "../lib/data";

const DashboardLayout = async ({ children }) => {
  const user = await fetchUser()
  // console.log("user: ", user)
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav user = {user}/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
