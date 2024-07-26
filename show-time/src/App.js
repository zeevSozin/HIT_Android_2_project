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

function App() {
  const [logedInUser, setLogedInUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

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
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
