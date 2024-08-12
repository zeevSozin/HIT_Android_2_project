import { useContext } from "react";
import CustomBarChart from "../components/dashboard/CustomBarChart";
import { InventoryMovieContext } from "../App";
import PositiveNegativeBarChart from "../components/dashboard/PositiveNegeativeBarChart";

function DashBoardPage() {
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );

  function movieIncomeData(data) {
    const result = data.map((mov) => {
      mov.expenses = (mov.avalibleAmount + mov.soldAmount) * mov.price;
      mov.revenue = mov.soldAmount * mov.retailPrice;
      mov.balance = mov.revenue - mov.expenses;
      return mov;
    });
    return result;
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <CustomBarChart
        data={inventoryMovies}
        barA={{ key: "avalibleAmount", name: "Avalible amount" }}
        barB={{ key: "soldAmount", name: "Sold Amount" }}
      />
      <CustomBarChart
        data={inventoryMovies}
        barA={{ key: "price", name: "Movie cost" }}
        barB={{ key: "retailPrice", name: "Retail Price" }}
      />
      <PositiveNegativeBarChart
        data={movieIncomeData(inventoryMovies)}
        barA={{ key: "balance", name: "Balance" }}
      />
    </div>
  );
}

export default DashBoardPage;
