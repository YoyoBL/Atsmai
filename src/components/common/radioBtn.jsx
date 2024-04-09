"use client";

import cn from "@/lib/tailwindMerge";
import { useParams } from "next/navigation";

const RadioBtn = ({
   form = {},
   color = "primary",
   name = "name",
   value = "value",
   label = "label",
   className = "",
   ...rest
}) => {
   const { lang } = useParams();

   if (label === "general") label = lang === "en" ? "General" : "כללי";
   return (
      <label
         className={cn(
            `capitalize btn btn-ghost has-[:checked]:text-white`,
            "bg-base-100",
            color === "primary"
               ? "has-[:checked]:bg-primary"
               : "has-[:checked]:bg-secondary",
            className
         )}
         htmlFor={`${value}Radio`}
      >
         <input
            id={`${value}Radio`}
            type="radio"
            name={name}
            value={value}
            onChange={form?.handleChange}
            hidden
            {...rest}
         />
         {label}
      </label>
   );
};

export default RadioBtn;
