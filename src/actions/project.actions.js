"use server";

import { getUserId } from "@/lib/userTools";
import Entry from "@/models/entry.model";
import Project from "@/models/project.model";
import { revalidatePath } from "next/cache";

const { default: dbConnect, serialize } = require("@/lib/mongoDbConnect");

export async function createProject(formValues) {
   try {
      const userId = await getUserId();
      await dbConnect();
      const newProject = await Project.create({ userId, ...formValues });
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
      const projects = await Project.find({ userId, status: "active" }).select(
         "title"
      );
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

export async function updateProject(oldEntry, newEntry, action) {
   const projectId = oldEntry?.project || newEntry?.project;
   const actions = {
      typeEdit: function () {
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
      amountChange: function () {
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
      unlink: function () {
         let query;
         const decrementValue = newEntry.amount * -1;
         if (newEntry.entryType === "expense") {
            query = {
               $inc: { totalExpenses: decrementValue },
            };
         } else if (newEntry.entryType === "income") {
            query = {
               $inc: { totalIncomes: decrementValue },
            };
         }
         query = {
            ...query,
            $pull: { entries: oldEntry._id },
         };
         console.log(query);
         return query;
      },
      link: function () {
         let query = {
            $push: {
               entries: newEntry._id,
            },
         };

         if (newEntry.entryType === "income") {
            query.$inc = { totalIncomes: newEntry.amount };
         } else if (newEntry.entryType === "expense") {
            query.$inc = { totalExpenses: newEntry.amount };
         }
         return query;
      },
   };
   try {
      const updated = await Project.findByIdAndUpdate(
         projectId,
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

export async function changeStatus(id) {
   try {
      const userId = await getUserId();
      await dbConnect();
      const project = await Project.findById(id);
      if (!project) throw new Error("Project not found");
      const projectOwnerId = String(project.userId);
      if (projectOwnerId !== userId) throw new Error("Access denied");
      const newStatus = project.status === "active" ? "inactive" : "active";
      const updated = await Project.findByIdAndUpdate(
         id,
         { status: newStatus },
         { new: true }
      );
      const data = serialize(updated);
      revalidatePath(`/[lang]/project/${id}`, "page");
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
