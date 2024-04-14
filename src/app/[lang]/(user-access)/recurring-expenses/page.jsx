import { getRecurringExpenses } from "@/actions/recurringExpense.actions";
import ConfirmModal from "@/components/common/confirmModal";
import Modal from "@/components/common/modal";
import ExpandedRecurring from "@/components/recurring-expenses/expandedRecurring";
import NewRecurringExpenseBtn from "@/components/recurring-expenses/newRecurringExpenseBtn";
import NewRecurringExpense from "@/components/recurring-expenses/newRecurringExpenseForm";
import RecurringExpenseCard from "@/components/recurring-expenses/recurringExpenseCard";
import SearchRecurring from "@/components/recurring-expenses/searchRecurring";
import { getDictionary } from "@/lib/dictionary";

const RecurringExpensesPage = async ({
   params: { lang },
   searchParams: { search },
}) => {
   const { recurringExpenses: text } = await getDictionary(lang);

   const res = await getRecurringExpenses();
   if (!res.ok) return <div>Server error, please try again later</div>;
   let recurringExpenses = res.data;
   if (search)
      recurringExpenses = recurringExpenses.filter((e) =>
         e.title.toLowerCase().startsWith(search.toLowerCase())
      );
   return (
      <section className="w-full flex flex-col items-center overflow-auto p-3">
         <div className="card bg-base-200 md:w-3/4">
            <div className="card-body">
               <div className="card-title text-2xl">{text.title}</div>
               <SearchRecurring />

               <div className="grid grid-cols-2 place-items-center md:flex md:flex-wrap md:items-center gap-3 bg-base-100 p-3 rounded-xl">
                  <NewRecurringExpenseBtn />

                  {recurringExpenses.map((recurringExpense) => (
                     <RecurringExpenseCard
                        key={recurringExpense._id}
                        recurringExpense={recurringExpense}
                     />
                  ))}
               </div>
            </div>
         </div>
         <Modal trigger="expanded">
            <ExpandedRecurring text={text.expanded} />
         </Modal>
         <Modal>
            <NewRecurringExpense text={text.newRecurringExpenseForm} />
         </Modal>
      </section>
   );
};

export default RecurringExpensesPage;
