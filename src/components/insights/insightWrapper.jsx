const InsightWrapper = ({ children, title = "Title" }) => {
   return (
      <div className="card bg-base-200 p-2 rounded-xl med:w-fit max-w-xl">
         <div className="card-title font-light text-lg">{title}</div>
         <div className="p-2 bg-base-100 grid place-items-center">
            {children}
         </div>
      </div>
   );
};

export default InsightWrapper;
