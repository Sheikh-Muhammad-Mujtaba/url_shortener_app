import URLShortener from "@/components/url-shortener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <URLShortener />
      <ToastContainer
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={2}
       />
    </>
  );
}