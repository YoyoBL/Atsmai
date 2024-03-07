import cn from "@/lib/tailwindMerge";

const RadioBtn = ({
   form = {},
   color = "primary",
   name = "name",
   value = "value",
   className = "",
   ...rest
}) => {
   return (
      <label
         className={cn(
            `capitalize btn btn-ghost has-[:checked]:text-white`,
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
         {value}
      </label>
   );
};

export default RadioBtn;
