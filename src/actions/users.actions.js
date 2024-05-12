"use server";

import { auth } from "@/auth";
import { customFetch } from "@/lib/customFetch";
import dbConnect, { serialize } from "@/lib/mongoDbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";

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

export async function EditUserRole(id) {
   try {
      await dbConnect();
      const user = await customFetch(`/api/users/${id}`);
      const updatedUserRole = user.role === "user" ? "admin" : "user";
      const updated = await User.findByIdAndUpdate(
         id,
         { role: updatedUserRole },
         {
            new: true,
         }
      );
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

export async function deleteUser(id) {
   try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deleteUser) return { ok: false, data: "Id to delete not found" };
      revalidatePath("/[lang]/admin-crm", "page");
      const data = serialize(deletedUser);
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

      const { firstName, lastName, email, role, _id, lang, vat } = user;
      return {
         ok: true,
         data: {
            firstName,
            lastName,
            email,
            role,
            lang,
            vat,
            _id: _id.toString(),
         },
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
