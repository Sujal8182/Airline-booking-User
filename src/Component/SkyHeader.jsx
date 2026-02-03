import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SkyHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../Redux/Reducers/userSlice";

const SkyHeader = ({ summary }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user , isAuth} = useSelector(
    state => state.user
  )
  const [open,setOpen] = useState(false)

  const handleLogout = ()=>{
    dispatch(logout())
    setOpen(false)
    navigate('/login')
  }
  return (
   <header className="sky-header">
      {/* LEFT */}
      <div className="sky-left">
        <Link to={'/'} >
        <span className="sky-logo">✈</span>
        <span className="sky-brand">SkyRoute</span>
        </Link>
      </div>

      {/* CENTER */}
      {summary && (
        <div className="sky-search-pill">
          {summary}
        </div>
      )}

      {/* RIGHT */}
      <div className="sky-right">
        <Link to="/my-bookings" className="sky-link">
          My bookings
        </Link>

        {!isAuth ? (
          /* NOT LOGGED IN */
          <Link to="/login">
            <button className="sky-login-btn">Log in</button>
          </Link>
        ) : (
          /* LOGGED IN */
          <div className="sky-user-wrapper">
            <button
              className="sky-user-btn"
              onClick={() => setOpen(prev => !prev)}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </button>

            {open && (
              <div className="sky-user-dropdown">
                <div className="sky-user-info">
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </div>

                <button
                  className="sky-logout-btn"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default SkyHeader;

