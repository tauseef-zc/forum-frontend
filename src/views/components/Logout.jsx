import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../app/slices/AuthSlice";

function Logout() {
  const [logoff, setLogoff] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  dispatch(logout());

  useEffect(() => {
    if (!user.is_logged) {
      setLogoff(true);
    }
  }, [user]);

  return !logoff ? (
    <div className="container">
      <p>Redirecting user to login...</p>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Logout;
