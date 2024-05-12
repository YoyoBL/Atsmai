"use client";

import { useSession } from "next-auth/react";

const UserName = () => {
   const {
      data: { user },
   } = useSession();
   return user.name;
};

export default UserName;
