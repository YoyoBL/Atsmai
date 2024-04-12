import { fetchUsers } from "@/actions/users.actions";
import { auth } from "@/auth";
import UsersTable from "@/components/adminCRM/usersTable";
import { redirect } from "next/navigation";

const AdminCrm = async ({ params: { lang } }) => {
   const session = await auth();
   const role = session?.user?.role;
   if (role !== "admin") return redirect(`/${lang}/`);
   const res = await fetchUsers();
   if (!res.ok) return console.log(res.data);
   const users = res.data;

   return (
      <section lang="en" dir="ltr" className="overflow-auto">
         <div className="card card-compact bg-base-200">
            <div className="card-body">
               <div className="card-title text-2xl justify-center">
                  Admin CRM
               </div>
               <UsersTable users={users} />
            </div>
         </div>
      </section>
   );
};

export default AdminCrm;
