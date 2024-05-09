const InsightWrapper = ({ children, title = "Title" }) => {
   return (
      <div className=" bg-base-200 p-2 rounded-xl">
         <div className="card-title text-xl">{title}</div>
         <div className="">{children}</div>
      </div>
   );
};

export default InsightWrapper;
