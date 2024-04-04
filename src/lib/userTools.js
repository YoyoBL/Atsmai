import { auth } from "@/app/api/auth/[...nextauth]/route";
import "server-only";

export async function getUserId() {
   const user = await auth();
   if (!user) throw new Error("Authenticated users only.");
   return user.user.id;
}
