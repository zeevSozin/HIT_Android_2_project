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
export const SearchMovieContext = createContext();
export const InventoryMovieContext = createContext([]);

function App() {
  const [logedInUser, setLogedInUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [searchMovieResults, setSearchMovieResults] = useState([]);
  const [inventoryMovies, setInventoryMovies] = useState([]);

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
              searchMovieResults: searchMovieResults,
              setSearchMovieResults: setSearchMovieResults,
            }}
          >
            <InventoryMovieContext.Provider
              value={{ inventoryMovies, setInventoryMovies }}
            >
              <BrowserRouter>
                <AppLayout />
              </BrowserRouter>
            </InventoryMovieContext.Provider>
          </SearchMovieContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
