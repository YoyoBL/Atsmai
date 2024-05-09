const Taxes = () => {
   return (
      <div className="w-full bg-black bg-opacity-35 py-2 bg-blend-overlay">
         <div className="flex ">
            <div className="flex justify-center items-center gap-2 flex-1">
               <div className="text-xs">VAT:</div>
               <div>1200</div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex justify-center items-center gap-2 flex-1">
               <div className="text-xs">Tax:</div>
               <div>1200</div>
            </div>
         </div>
      </div>
   );
};

export default Taxes;
