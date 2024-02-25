import cn from "@/lib/tailwindMerge";

const RadioBtn = ({
   form = {},
   color = "primary",
   name = "name",
   value = "value",
   className = "",
   ...rest
}) => {
   const colors = {
      primary: "bg-primary",
      secondary: "bg-secondary",
   };
   return (
      <label
         className={cn(
            `capitalize btn btn-ghost has-[:checked]:bg-${color} has-[:checked]:text-white`,
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
