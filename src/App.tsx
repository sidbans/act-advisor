import "./App.css";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-dvh">
            <Header />
            <div className="flex-1">
              <RouterProvider router={router} />
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
