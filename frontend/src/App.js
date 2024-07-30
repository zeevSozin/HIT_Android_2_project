import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000,
    },
  },
});

export const UserContext = createContext();
export const TokenContext = createContext();
export const SearchMovieContext = createContext([]);
export const InventoryMovieContext = createContext([]);
export const ShownMovieContext = createContext([]);
export const MovieInCartContext = createContext([]);
export const CardModeContext = createContext("");
export const LoadingContext = createContext();

function App() {
  const [logedInUser, setLogedInUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [inventoryMovies, setInventoryMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesInCart, setMoviesInCart] = useState([]);
  const [cardMode, setCardMode] = useState("sell");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <UserContext.Provider
          value={{
            logedInUser: logedInUser,
            setLogedInUser: setLogedInUser,
          }}
        >
          <SearchMovieContext.Provider
            value={{
              searchMoviesResults,
              setSearchMoviesResults,
            }}
          >
            <InventoryMovieContext.Provider
              value={{ inventoryMovies, setInventoryMovies }}
            >
              <MovieInCartContext.Provider
                value={{ moviesInCart, setMoviesInCart }}
              >
                <CardModeContext.Provider value={{ cardMode, setCardMode }}>
                  <ShownMovieContext.Provider value={{ movies, setMovies }}>
                    <LoadingContext.Provider
                      value={{ isLoading, setIsLoading }}
                    >
                      <BrowserRouter>
                        <AppLayout />
                      </BrowserRouter>
                    </LoadingContext.Provider>
                  </ShownMovieContext.Provider>
                </CardModeContext.Provider>
              </MovieInCartContext.Provider>
            </InventoryMovieContext.Provider>
          </SearchMovieContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
