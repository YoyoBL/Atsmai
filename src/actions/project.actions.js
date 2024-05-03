"use server";

import { getUserId } from "@/lib/userTools";
import Project from "@/models/project.model";

const { default: dbConnect, serialize } = require("@/lib/mongoDbConnect");

export async function createProject(formValues) {
   const userId = await getUserId();
   const { title } = formValues;
   try {
      await dbConnect();
      const newProject = await Project.create({ userId, title });
      const data = serialize(newProject);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
