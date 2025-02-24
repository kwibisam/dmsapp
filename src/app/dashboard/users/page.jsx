import { fetchUsers } from "@/app/lib/data";
import UsersTable from "@/app/ui/users/users-table";
import Link from "next/link";
export const metadata = {
  title: "Users",
};

export default async function Users(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const userCreated = searchParams.create
  // const customers = await fetchFilteredCustomers(query);
  const users = await fetchUsers();
  return (
    <div className="w-full">
        {userCreated && (
               <div className="fixed inset-0 bg-black bg-opacity-15 flex justify-center py-12 z-50">
               <div className="bg-white p-4 rounded-md">
                 <div>
                    <p className="mb-4">User Created Successfully</p>
                    <Link href="/dashboard/users" className="bg-green-400 p-4 py-2 rounded-md">finish</Link>
                 </div>
               </div>
             </div>
        )}
      <UsersTable users={users} />
    </div>
  );
}
