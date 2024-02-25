const TaxCard = ({
   entries = [],
   date = "",
   taxPercent = 1,
   taxName = "Tax Name",
}) => {
   const tax = entries.reduce(
      (accumulator, currentValue) =>
         (accumulator + currentValue.amount) * taxPercent,
      0
   );
   const roundedTax = Math.round((tax + Number.EPSILON) * 100) / 100;
   return (
      <div className="card bg-base-100 bg-opacity-70 w-28">
         <div className="p-2 text-xs text-center">
            <div>{taxName}</div>
            <div>{roundedTax}</div>
         </div>
      </div>
   );
};

export default TaxCard;
