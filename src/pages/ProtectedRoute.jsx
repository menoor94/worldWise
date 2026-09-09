import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthentication } = useAuth();

  useEffect(
    function () {
      if (!isAuthentication) navigate("/");
    },
    [isAuthentication, navigate],
  );

  return isAuthentication ? children : null;
}
export default ProtectedRoute;
