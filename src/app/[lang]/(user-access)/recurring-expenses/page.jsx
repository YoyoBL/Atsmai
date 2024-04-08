import { getRecurringExpenses } from "@/actions/recurringExpense.actions";
import ConfirmModal from "@/components/common/confirmModal";
import NewRecurringExpenseBtn from "@/components/recurring-expenses/newRecurringExpenseBtn";
import RecurringExpenseCard from "@/components/recurring-expenses/recurringExpenseCard";

const RecurringExpensesPage = async ({ params: { lang } }) => {
   const res = await getRecurringExpenses();
   if (!res.ok) throw new Error(res.data);
   const recurringExpenses = res.data;
   return (
      <section className="overflow-auto">
         {/* <h1 className="text-lg m-4 mb-5">Recurring Expenses</h1>

         <div className="flex flex-wrap sm:justify-normal justify-center items-center gap-3">
            <NewRecurringExpenseBtn />

            {recurringExpenses.map((recurringExpense) => (
               <RecurringExpenseCard
                  key={recurringExpense._id}
                  recurringExpense={recurringExpense}
               />
            ))}
         </div>
         <ConfirmModal /> */}
      </section>
   );
};

export default RecurringExpensesPage;
