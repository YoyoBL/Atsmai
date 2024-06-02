"use client";

import { createProject } from "@/actions/project.actions";
import { YupProjectSchema } from "@/lib/yupSchemas";
import { format } from "date-fns";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const NewProjectForm = ({ onAdd = () => {}, text }) => {
   text = text.newProjectForm;
   const form = useFormik({
      initialValues: {
         title: "",
         startDate: format(new Date(), "yyyy-MM-dd"),
         status: "active",
      },
      onSubmit: async (values) => {
         try {
            const res = await createProject(values);
            if (!res.ok) throw new Error(res.data);
            onAdd();
            toast.success("Project Added");
            form.resetForm();
         } catch (error) {
            console.log(error);
            toast.error(error.message);
         }
      },
      validationSchema: YupProjectSchema(),
   });

   return (
      <form onSubmit={form.handleSubmit}>
         <h2 className="text-xl font-bold text-center">{text.title}</h2>
         <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text">{text.projectTitle}:</span>
            </div>
            <input
               {...form.getFieldProps("title")}
               type="text"
               placeholder="Type here"
               className="input input-bordered w-full max-w-xs placeholder:opacity-50"
            />
            {form.touched.title && form.errors.title && (
               <div className="text-error p-2">{form.errors.title}</div>
            )}
            <div className="label"></div>
         </label>
         <label className="form-control w-full max-w-xs">
            <div className="label">
               <span className="label-text">{text.startDate}:</span>
            </div>
            <input
               {...form.getFieldProps("startDate")}
               type="date"
               placeholder="Type here"
               className="input input-bordered w-full max-w-xs placeholder:opacity-50"
            />
            {form.touched.startDate && form.errors.startDate && (
               <div className="text-error p-2">{form.errors.startDate}</div>
            )}
            <div className="label"></div>
         </label>
         <button type="submit" className="btn btn-primary btn-block">
            {text.add}
         </button>
      </form>
   );
};

export default NewProjectForm;
