import { toast } from "react-toastify";
function ToastMessage({ type, message }) {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  switch (type) {
    case "ERR_NETWORK":
      toast.error(message, { ...toastOptions });
      break;
    case "SUCCESS":
      toast.success(message, { ...toastOptions });
      break;
    case "WARNING":
      toast.warning(message, { ...toastOptions });
      break;
    case "INFO":
      toast.info(message, { ...toastOptions });
      break;
    default:
      break;
  }
}

export default ToastMessage;
