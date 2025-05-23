import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>E-Donation Portal | Don't Dump, Donate</title>
      <meta name="description" content="Connect with others to donate and receive items instead of throwing them away. Reduce waste and help your community through our donation platform." />
    </Helmet>
    <App />
  </HelmetProvider>
);
