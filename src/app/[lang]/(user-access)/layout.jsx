import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const UserLayout = async ({ children, params: { lang } }) => {
   const session = await auth();
   if (!session) return redirect(`/${lang}/welcome`);

   return children;
};

export default UserLayout;
