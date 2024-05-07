"use server";

import { getUserId } from "@/lib/userTools";
import Project from "@/models/project.model";
import { revalidatePath } from "next/cache";

const { default: dbConnect, serialize } = require("@/lib/mongoDbConnect");

export async function createProject(formValues) {
   const userId = await getUserId();
   const { title } = formValues;
   try {
      await dbConnect();
      const newProject = await Project.create({ userId, title });
      const data = serialize(newProject);
      revalidatePath("/[lang]/projects", "page");
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchProjectsTitles(project) {
   const userId = await getUserId();
   try {
      await dbConnect();
      const projects = await Project.find({ userId }).select("title");
      const data = serialize(projects);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchProjects() {
   const userId = await getUserId();
   try {
      await dbConnect();
      const projects = await Project.find({ userId }, { userId: false });
      const data = serialize(projects);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function syncProject(newEntry) {
   let updateObject = {
      $push: {
         entries: newEntry._id,
      },
   };

   if (newEntry.entryType === "income") {
      updateObject.$inc = { totalIncomes: newEntry.amount };
   } else if (newEntry.entryType === "expense") {
      updateObject.$inc = { totalExpenses: newEntry.amount };
   }
   return Project.findByIdAndUpdate(newEntry.project, updateObject, {
      new: true,
   });
}
