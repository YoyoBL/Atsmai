"use server";

import { getUserId } from "@/lib/userTools";
import Entry from "@/models/entry.model";
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

export async function getProjectById(id) {
   try {
      await dbConnect();
      const project = await Project.findById(id).populate("entries");
      if (!project) throw new Error("Project id doesn't exist");
      const data = serialize(project);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function updateTitle(id, formData) {
   const newTitle = formData.get("newTitle");

   try {
      await dbConnect();
      const updated = await Project.findByIdAndUpdate(
         id,
         { title: newTitle },
         { new: true }
      );
      const data = serialize(updated);
      revalidatePath("/[lang]/projects/[projectId]", "page");
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function deleteProject(id) {
   try {
      await dbConnect();
      const updateEntries = Entry.updateMany(
         { project: id },
         { $unset: { project: 1 } },
         { multi: true }
      );
      const deleteProject = Project.findByIdAndDelete(id);
      const results = await Promise.allSettled([updateEntries, deleteProject]);
      revalidatePath("/[lang]/projects", "page");
      return { ok: true, data: "Success" };
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

export async function updateProject(oldEntry, newEntry, action) {
   console.log(oldEntry, newEntry);
   const actions = {
      typeEdit: () => {
         const decrement = oldEntry.amount * -1;
         if (newEntry.entryType === "expense") {
            return {
               $inc: {
                  totalIncomes: decrement,
                  totalExpenses: newEntry.amount,
               },
            };
         } else if (newEntry.entryType === "income") {
            return {
               $inc: {
                  totalExpenses: decrement,
                  totalIncomes: newEntry.amount,
               },
            };
         }
      },
      amountChange: () => {
         let query;
         const difference = newEntry.amount - oldEntry.amount;
         if (newEntry.entryType === "expense") {
            query = {
               $inc: { totalExpenses: difference },
            };
         } else if (newEntry.entryType === "income") {
            query = {
               $inc: { totalIncomes: difference },
            };
         }
         return query;
      },
   };
   try {
      const updated = await Project.findByIdAndUpdate(
         oldEntry.project,
         actions[action](),
         { new: true }
      );
      const data = serialize(updated);
      revalidatePath("/[lang]/projects", "page");
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
