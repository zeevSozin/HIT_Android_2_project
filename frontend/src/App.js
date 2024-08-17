import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/AppLayout";
import { createContext, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tippy/dist/tippy.css";

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
export const PurchaseModalContext = createContext();
export const InventoryRefetchContxt = createContext();

function App() {
  const [logedInUser, setLogedInUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    userId: "",
  });

  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [inventoryMovies, setInventoryMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesInCart, setMoviesInCart] = useState([]);
  const [cardMode, setCardMode] = useState("sell");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const inventoryRefetch = {};

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
              <InventoryRefetchContxt.Provider value={{ inventoryRefetch }}>
                <MovieInCartContext.Provider
                  value={{ moviesInCart, setMoviesInCart }}
                >
                  <CardModeContext.Provider value={{ cardMode, setCardMode }}>
                    <ShownMovieContext.Provider value={{ movies, setMovies }}>
                      <LoadingContext.Provider
                        value={{ isLoading, setIsLoading }}
                      >
                        <PurchaseModalContext.Provider
                          value={{
                            isPurchaseModalOpen,
                            setIsPurchaseModalOpen,
                          }}
                        >
                          <BrowserRouter>
                            <AppLayout />
                          </BrowserRouter>
                        </PurchaseModalContext.Provider>
                      </LoadingContext.Provider>
                    </ShownMovieContext.Provider>
                  </CardModeContext.Provider>
                </MovieInCartContext.Provider>
              </InventoryRefetchContxt.Provider>
            </InventoryMovieContext.Provider>
          </SearchMovieContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
