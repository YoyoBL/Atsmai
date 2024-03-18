const NewRecurringExpense = () => {
   return (
      <section>
         <form action="" className="space-y-3">
            <input
               type="text"
               placeholder="Title"
               className="input input-bordered w-full"
            />
            <input
               type="text"
               placeholder="Amount"
               className="input input-bordered w-full"
            />
            <input
               type="text"
               placeholder="Category"
               className="input input-bordered w-full"
            />
            <input
               type="text"
               placeholder="Date in month"
               className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-neutral btn-block">
               Add
            </button>
         </form>
      </section>
   );
};

export default NewRecurringExpense;
