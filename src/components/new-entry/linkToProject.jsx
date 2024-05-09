"use client";

import { fetchProjectsTitles } from "@/actions/project.actions";
import cn from "@/lib/tailwindMerge";
import { useEffect, useState } from "react";

const LinkToProject = ({ form, color }) => {
   const [checked, setChecked] = useState(form.project);
   const [error, setError] = useState("");
   const [projects, setProjects] = useState([]);

   const isIncome = color === "primary";

   useEffect(() => {
      if (checked)
         (async () => {
            try {
               const res = await fetchProjectsTitles();
               if (!res.ok) throw new Error("Error while fetching projects");
               const projectsTitles = setProjects(res.data);
            } catch (error) {
               setError(error.message);
            }
         })();
      if (!checked) {
         form.setFieldValue("project", null);
         const select = document.getElementById("project-select");
         select.selectedIndex = 0;
      }
   }, [checked]);

   function onSelect(value) {
      form.setFieldValue("project", value);
   }

   if (error) return <div className="text-error">{error}</div>;
   return (
      <div>
         {/* checkbox */}
         <div className="form-control">
            <label className="label justify-start gap-3 cursor-pointer">
               <input
                  type="checkbox"
                  className={cn(
                     "checkbox",
                     isIncome
                        ? "checked:checkbox-primary"
                        : "checked:checkbox-secondary"
                  )}
                  defaultChecked={checked}
                  onChange={() => setChecked((checked) => !checked)}
               />
               <span className="label-text">Link to project</span>
            </label>
         </div>

         {/* select */}
         <select
            id="project-select"
            disabled={!checked}
            className={cn(
               "select select-bordered  w-full",
               isIncome ? "select-primary" : "select-secondary"
            )}
            onChange={(e) => onSelect(e.target.value)}
         >
            <option disabled value="default">
               Select Project..
            </option>
            {projects.length ? (
               projects.map((project) => (
                  <option key={project._id} value={project._id}>
                     {project.title}
                  </option>
               ))
            ) : (
               <option>Loading Projects...</option>
            )}
         </select>
      </div>
   );
};

export default LinkToProject;
