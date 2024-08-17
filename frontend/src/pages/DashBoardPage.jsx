import styles from "./DashBoardPage.module.css";
import { useContext, useEffect } from "react";
import CustomBarChart from "../components/dashboard/CustomBarChart";
import { InventoryMovieContext, InventoryRefetchContxt } from "../App";
import PositiveNegativeBarChart from "../components/dashboard/PositiveNegeativeBarChart";
import BalancePieChart from "../components/dashboard/BalancePieChart";

function DashBoardPage() {
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const { inventoryRefetch } = useContext(InventoryRefetchContxt);

  useEffect(() => {
    console.log(inventoryRefetch);
    // inventoryRefetch.fn();
  }, []);

  function movieIncomeData(data) {
    const result = data.map((mov) => {
      const tempExpenses = (mov.avalibleAmount + mov.soldAmount) * mov.price;
      mov.expenses = +tempExpenses.toFixed(2);
      const tempRevenu = mov.soldAmount * mov.retailPrice;
      mov.revenue = +tempRevenu.toFixed(2);
      const tempBalance = mov.revenue - mov.expenses;
      mov.balance = +tempBalance.toFixed(2);
      return mov;
    });
    return result;
  }

  function balanceData(data) {
    const movieData = movieIncomeData(data);
    const income = movieData.reduce((acc, cur) => {
      const res = acc + cur.revenue;
      const fixedRes = +res.toFixed(2);
      return fixedRes;
    }, 0);
    const expenses = movieData.reduce((acc, cur) => {
      const res = acc + cur.expenses;
      const fixedRes = +res.toFixed(2);
      return fixedRes;
    }, 0);
    return { income, expenses };
  }

  return (
    <div className={styles.container}>
      <h2>Total Balance</h2>
      <BalancePieChart balance={balanceData(inventoryMovies)} />
      <div className={styles.pieChartLables}></div>
      <h2>Balance per movie</h2>
      <PositiveNegativeBarChart
        data={movieIncomeData(inventoryMovies)}
        barA={{ key: "balance", name: "Balance" }}
      />
      <h2>Inventory costs</h2>
      <CustomBarChart
        data={inventoryMovies}
        barA={{ key: "price", name: "Movie cost" }}
        barB={{ key: "retailPrice", name: "Retail Price" }}
      />
      <h2>Inventory</h2>
      <CustomBarChart
        data={inventoryMovies}
        barA={{ key: "avalibleAmount", name: "Avalible amount" }}
        barB={{ key: "soldAmount", name: "Sold Amount" }}
      />
    </div>
  );
}

export default DashBoardPage;
