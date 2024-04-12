"use server";

import { auth } from "@/auth";
import dbConnect, { serialize } from "@/lib/mongoDbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { revalidateTag } from "next/cache";

export async function fetchUsers() {
   const session = await auth();
   const role = session?.user?.role;
   if (role !== "admin") return { ok: false, data: "Admin user only." };

   try {
      const users = await User.find({}, { password: false });
      const data = serialize(users);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function addNewUser(values) {
   try {
      await dbConnect();
      // check if user exists
      const email = values.email.toLowerCase();
      const exists = await User.findOne({ email });

      if (exists) throw new Error("Email already registered.");
      const hashedPassword = await bcrypt.hash(values.password, 12);
      const newUser = await User.create({
         ...values,
         email,
         password: hashedPassword,
      });
      const { firstName, lastName, _id } = newUser;
      return {
         ok: true,
         data: { firstName, lastName, email, _id: _id.toString() },
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function EditUser(id, valuesToUpdate) {
   try {
      await dbConnect();

      const updated = await User.findByIdAndUpdate(id, valuesToUpdate, {
         new: true,
      });
      const data = serialize(updated);
      revalidateTag("user");

      return {
         ok: true,
         data,
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function signIn(credentials) {
   try {
      await dbConnect();
      const user = await User.findOne({
         email: credentials.email.toLowerCase(),
      });
      if (!user) throw new Error("Wrong email or password");

      const validatePassword = await bcrypt.compare(
         credentials.password,
         user.password
      );
      if (!validatePassword) throw new Error("Wrong email or password");

      const { firstName, lastName, email, role, image, _id } = user;
      return {
         ok: true,
         data: { firstName, lastName, email, role, image, _id: _id.toString() },
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
