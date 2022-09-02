import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider, createClient } from "urql";
import Navbar from "../components/Navbar";
import { StateContext } from "../lib/context";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const client = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_API,
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <div className="w-screen min-h-screen bg-[#f6f3f3]">
            <Toaster
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "black",
                    secondary: "white",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "black",
                    secondary: "white",
                  },
                },
              }}
            />
            <Navbar />
            <Component {...pageProps} />
          </div>
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
