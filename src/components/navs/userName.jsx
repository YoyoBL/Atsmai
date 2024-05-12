"use client";

import { useSession } from "next-auth/react";

const UserName = () => {
   const { data } = useSession();
   if (!data?.user) return;
   const { user } = data;
   return user.name;
};

export default UserName;
