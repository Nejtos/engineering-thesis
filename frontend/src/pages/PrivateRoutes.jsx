import { Navigate } from "react-router-dom";
import { authServices } from "../services/authServices";

const PrivateRoutes = (props) => {
  const { component } = props;
  const token = authServices();
  return token ? component : <Navigate to="/login" />;
};

export default PrivateRoutes;