import { auth } from "@/auth";
import "server-only";

export async function getUserId() {
   const user = await auth();
   if (!user) throw new Error("Authenticated users only.");
   return user.user.id;
}
