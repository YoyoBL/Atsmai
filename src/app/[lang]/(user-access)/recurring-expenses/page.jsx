import { getRecurringExpenses } from "@/actions/recurringExpense.actions";
import ConfirmModal from "@/components/common/confirmModal";
import Modal from "@/components/common/modal";
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
         <h1 className="text-3xl m-4 mb-5">{text.title}</h1>
         <SearchRecurring />

         <div className="flex flex-wrap items-center gap-3">
            <NewRecurringExpenseBtn />

            {recurringExpenses.map((recurringExpense) => (
               <RecurringExpenseCard
                  key={recurringExpense._id}
                  recurringExpense={recurringExpense}
               />
            ))}
         </div>
         <Modal>
            <NewRecurringExpense text={text.newRecurringExpenseForm} />
         </Modal>
         <ConfirmModal />
      </section>
   );
};

export default RecurringExpensesPage;
