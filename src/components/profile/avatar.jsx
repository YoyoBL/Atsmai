import { auth } from "@/auth";
import Link from "next/link";

const Avatar = async () => {
   const { user } = await auth();
   if (!user) return null;
   const splitName = user.name.split(" ");
   const initials = splitName[0][0] + splitName[1][0];

   return (
      <Link href={`profile`} className=" " prefetch={true}>
         <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-20">
               <span className="text-3xl">{initials}</span>
            </div>
         </div>
      </Link>
   );
};

export default Avatar;
