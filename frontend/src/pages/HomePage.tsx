import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Card from "@/components/Card";
import CardsWrapper from "@/components/CardsWrapper";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/userQueries";

ChartJS.register(ArcElement, Tooltip, Legend);
const HomePage = () => {
  const { loading, error, data } = useQuery(GET_AUTH_USER);

  if (loading) return "loading";
  if(error) return "Error getting user"

  console.log(data);

  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 50,
        spacing: 10,
        cutout: 130,
      },
    ],
  };

  return (
    <>
      <Header title="Graph QL" />
      {data.authUser && <h1 className="font-bold text-5xl text-center mb-20">Welcome {data.authUser.username}</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px] mx-auto mb-4">
          <Doughnut data={chartData} />
        </div>
        <TransactionForm type="Create" />
      </div>
      <CardsWrapper>
        <Card transactionType="expense" />
        <Card transactionType="investment" />
        <Card transactionType="saving" />
        <Card transactionType="investment" />
      </CardsWrapper>
    </>
  );
};

export default HomePage;
