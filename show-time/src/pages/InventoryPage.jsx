import ListContainer from "../components/ListContainer";
import useAxios from "./../hooks/useAxios";
import axios from "axios";

const data = [
  {
    adult: false,
    backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    genre_ids: [16, 10751, 12, 35],
    id: 1022789,
    original_language: "en",
    original_title: "Inside Out 2",
    overview:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    popularity: 5571.077,
    poster_path:
      "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    release_date: "2024-06-11",
    title: "Inside Out 2",
    video: false,
    vote_average: 7.668,
    vote_count: 1962,
  },
  {
    adult: false,
    backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
    genre_ids: [16, 10751, 35, 28],
    id: 519182,
    original_language: "en",
    original_title: "Despicable Me 4",
    overview:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    popularity: 4439.3,
    poster_path:
      "https://image.tmdb.org/t/p/w500/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
    release_date: "2024-06-20",
    title: "Despicable Me 4",
    video: false,
    vote_average: 7.3,
    vote_count: 350,
  },
  {
    adult: false,
    backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
    genre_ids: [16, 10751, 35, 28],
    id: 519183,
    original_language: "en",
    original_title: "Despicable Me 4",
    overview:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    popularity: 4439.3,
    poster_path:
      "https://image.tmdb.org/t/p/w500/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
    release_date: "2024-06-20",
    title: "Despicable Me 4",
    video: false,
    vote_average: 7.3,
    vote_count: 350,
  },
  {
    adult: false,
    backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
    genre_ids: [16, 10751, 35, 28],
    id: 519184,
    original_language: "en",
    original_title: "Despicable Me 4",
    overview:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    popularity: 4439.3,
    poster_path:
      "https://image.tmdb.org/t/p/w500/3w84hCFJATpiCO5g8hpdWVPBbmq.jpg",
    release_date: "2024-06-20",
    title: "Despicable Me 4",
    video: false,
    vote_average: 7.3,
    vote_count: 350,
  },
];

function InventoryPage() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  const objConfig = {
    axiosInstance: axiosInstance,
    method: "get",
    url: "/moviesprovider/nowInCinemas",
  };

  const [response, error, loading, refetch] = useAxios(objConfig);
  return (
    <div>
      <h1>Inventory</h1>
      {error !== "canceled" ? <h4>Error getting data</h4> : ""}
      {loading ? <h4>Loading........</h4> : <ListContainer data={response} />}
      {/* <ListContainer data={data} /> */}
    </div>
  );
}

export default InventoryPage;
