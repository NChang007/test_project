import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import LogRegBtn from "./LogRegBtn";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = sessionStorage.getItem('token')
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
      <div className="container-fluid">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <span className="navbar-brand" style={{ color: "white" }}>
            AliveInLA.
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{flexGrow: '0'}}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white" }}
              >
                All resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item">Healthcare</a>
                </li>
                <li>
                  <a className="dropdown-item">Water</a>
                </li>
                <li>
                  <a className="dropdown-item">Food</a>
                </li>
                <li>
                  <a className="dropdown-item">Something else here</a>
                </li>
              </ul>
            </li>
            {/* <li className="nav-item">
              <Link to="/login">
                <span className="btn" style={{ color: "white" }}>
                  Login
                </span>
              </Link>
            </li> */}
            {token ? 
              <li className="nav-item">
                <Link to="/userProfile">
                  <span className="btn" style={{ color: "white" }}>
                    Profile
                  </span>
                </Link>
              </li>
              :
              ""
            }
            {token ? 
            <li className="nav-item">
              <span 
                className="btn "
                style={{ color: "white" }} 
                onClick={() => actions.logout()}
              >
                Logout
              </span>
            </li>
            :
            <li className="nav-item">
              <LogRegBtn />
            </li>
              }
          </ul>
        </div>
      </div>
    </nav>
  );
};
