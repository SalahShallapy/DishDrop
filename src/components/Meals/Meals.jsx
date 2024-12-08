import useHttp from "../../hooks/useHttp.js";

import SingleMeal from "./SingleMeal";
import Error from "../Error.jsx";

const requestConifg = {};
export default function Meals() {
  const {
    data: fetchedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConifg, []);

  if (isLoading) {
    return <p className="loading-message">Fetching Avilable Meals... ⟳ </p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {fetchedMeals.map((meal) => (
        <SingleMeal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
