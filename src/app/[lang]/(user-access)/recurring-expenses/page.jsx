import { getRecurringExpenses } from "@/actions/recurringExpense.actions";
import ConfirmModal from "@/components/common/confirmModal";
import NewRecurringExpenseBtn from "@/components/recurring-expenses/newRecurringExpenseBtn";
import RecurringExpenseCard from "@/components/recurring-expenses/recurringExpenseCard";
import SearchRecurring from "@/components/recurring-expenses/searchRecurring";

const RecurringExpensesPage = async ({
   params: { lang },
   searchParams: { search },
}) => {
   const res = await getRecurringExpenses();
   if (!res.ok) return <div>Server error, please try again later</div>;
   let recurringExpenses = res.data;
   if (search)
      recurringExpenses = recurringExpenses.filter((e) =>
         e.title.toLowerCase().startsWith(search.toLowerCase())
      );
   return (
      <section className="w-full overflow-auto p-3">
         <h1 className="text-lg m-4 mb-5">Recurring Expenses</h1>
         <SearchRecurring />

         <div className="flex flex-wrap sm:justify-normal justify-center items-center gap-3">
            <NewRecurringExpenseBtn />

            {recurringExpenses.map((recurringExpense) => (
               <RecurringExpenseCard
                  key={recurringExpense._id}
                  recurringExpense={recurringExpense}
               />
            ))}
         </div>
         <ConfirmModal />
      </section>
   );
};

export default RecurringExpensesPage;
