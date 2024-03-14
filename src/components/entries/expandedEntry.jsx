const ExpandedEntry = () => {
   return (
      <div className="card bg-base-100 px-3 cursor-pointer hover:bg-base-200 transition-colors duration-150">
         <div className="p-3 flex flex-row justify-between items-center">
            <div className="text-base">{amount}</div>
            <div className="text-gray-500">{category}</div>
            <div className="text-gray-600 text-xs">{date}</div>
         </div>
      </div>
   );
};

export default ExpandedEntry;
