import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notify() {
    return (
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    );
}
export default Notify;