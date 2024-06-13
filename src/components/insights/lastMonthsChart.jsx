"use client";
import {
   ChartJS,
   Bar,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
} from "@/lib/imports";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../tailwind.config";
import InsightWrapper from "./insightWrapper";
import { useEffect, useState } from "react";
import { fetchLastMonths } from "@/actions/entries.actions";

const dataSample = [
   {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
   },
   {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
   },
   {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
   },
   {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
   },
   {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
   },
   {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
   },
   {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
   },
];

const LastMonthsChart = () => {
   ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend);

   const [entries, setEntries] = useState([]);
   const [serverError, setServerError] = useState("");

   useEffect(() => {
      (async () => {
         const res = await fetchLastMonths();
         if (!res.ok) return setServerError(res.data);
         setEntries(res.data);
      })();
   }, []);

   const data = {
      labels: entries.map((row) => row.month),
      datasets: [
         {
            label: "Incomes",
            data: entries.map((row) => row.incomes),
            backgroundColor: PRIMARY_COLOR,
         },
         {
            label: "Expenses",
            data: entries.map((row) => row.expenses),
            backgroundColor: SECONDARY_COLOR,
         },
         {
            label: "Profit",
            data: entries.map((row) => row.profit),
            backgroundColor: "grey",
         },
      ],
   };

   const options = {
      plugins: {
         legend: {
            labels: {
               boxWidth: 15,
            },
            position: "bottom",
         },
      },

      responsive: true,
      maintainAspectRatio: false,
      interaction: {
         mode: "index",
      },
   };

   return (
      <InsightWrapper title="Previous months" className={"w-full"}>
         <div className="min-h-[400px]">
            <Bar data={data} options={options} />
         </div>
      </InsightWrapper>
   );
};

export default LastMonthsChart;
