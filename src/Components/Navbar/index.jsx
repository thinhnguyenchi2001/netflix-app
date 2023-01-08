import "./navbar.scss";
// import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchAppBar from "../SearchAppBar";
import ScrollDialog from "../Dialog";
import ResponsiveAppBar from "../Avtar";
import AccountMenu from "../Menu";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const nameUser = useSelector((state) => state.app.user?.name);
  const user = useSelector((state) => state.app.user);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // useEffect(() => {
  //   window.addEventListener("wheel", () => {
  //     document.querySelector(".container").style.backgroundColor =
  //       "rgb(0 0 0 / 60%)";
  //   });
  // });

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <span>
            <Link to="/">Home</Link>
          </span>

          <span>
            <Link to="/Movies">Movies</Link>
          </span>
          <span>
            <Link to="/TVs">TV Shows</Link>
          </span>
          {/* <span>New {"&"} Popular</span>
          <span>Homepage</span>
          <span>My List</span> */}
        </div>
        <div className="right">
          <SearchAppBar />
          {/* <Search className="search" /> */}
          {/* <Notifications className="notifucations" /> */}
          {user ? (
            <div className="avatar">
              {" "}
              <ResponsiveAppBar />
            </div>
          ) : (
            <>
              <div className="get-start">
                <Link to="/register">Get Started</Link>
              </div>
              {/* <div>
                <Link to="/register">Register</Link>
              </div> */}
            </>
          )}
          <div className="menu-icon">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
