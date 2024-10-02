import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import * as patternActions from "../../redux/pattern";
// import * as testerActions from "../../redux/tester";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




import "./Navigation.css";

function Navigation() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [navBarOpen, setNavBarOpen] = useState(true);
  const loggedIn = useSelector((state) => state.session.user)
  // console.log("LOGGEDIN: ", loggedIn)

  const navBarView = () => {
    const mainNav = document.getElementById("main-nav");
    const toggelNav = document.getElementById("toggle-nav");
    // const openNavText = document.querySelectorAll(".nav-open-text");
    setNavBarOpen(!navBarOpen);

    //set some quick stylings
    if (navBarOpen) {
      mainNav.classList.add("closed");
      mainNav.style.height = "25px";
      toggelNav.style.transform = "rotate(270deg)";
      // openNavText.forEach(text => {
      //   text.style.display = "none"; //do not display longer text
      // })
    } else {
      mainNav.classList.remove("closed");
      mainNav.style.height = "85px";
      toggelNav.style.transform = "rotate(90deg)";
      // openNavText.forEach(text => {
      //   text.style.display = "block";

      // });
    }
  }

  return (
    <nav id="main-nav">
      <ul id="nav-list">
        <li className="nav-profile">
          {!loggedIn ? (
            <ProfileButton />
          ) : (
            <div id="logged-in-nav">
              <ProfileButton />
              {navBarOpen && (
                <div className="nav-greeting">
                  <p>Welcome, {loggedIn.username}!</p>
                </div>
              )}
            </div>
          )}
        </li>
        <div className="nav-selection">
          <div className="nav-choices">
            <NavLink className="nav-home nav-clicks" to-='/'>
              <span className="material-symbols-outlined">
                gesture
              </span>
            </NavLink>
            <span className="nav-open-text">  Home</span>
          </div>

          {loggedIn ? (
            <div className="nav-choices">
              <NavLink className="nav-create-pattern nav-clicks" disabled={!loggedIn} to='/pattern/new'>
                <span className="material-symbols-outlined">
                  history_edu
                </span>
              </NavLink>
              <span className="nav-open-text">  Create a Pattern</span>
            </div>
          ) : (
            <div>Log in or signup to intereact with your patterns and tests </div>
          )}


          {loggedIn ? (
            <div className="nav-choices">
              <NavLink className="nav-user-patterns nav-clicks" to={`/patterns/${loggedIn.id}`}>
                <span className="material-symbols-outlined">
                  diagnosis
                </span>
              </NavLink>
              <span className="nav-open-text">  View Patterns</span>
            </div>
          ) : (
            ''
          )}

          {loggedIn ? (
            <div className="nav-choices">
              <NavLink className="nav-user-tests nav-clicks" to={`/tests/${loggedIn.id}`}>
                <span className="material-symbols-outlined">
                  reviews
                </span>
              </NavLink>
              <span className="nav-open-text">  View Tests</span>
            </div>
          ) : (
            ''
          )}
          {loggedIn ? (
            <div className="nav-choices">
              <NavLink className="nav-user-checkout nav-clicks" to={`/${loggedIn.id}/checkout`}>
                <span className="material-symbols-outlined">
                  collections_bookmark
                </span>
              </NavLink>
              <span className="nav-open-text">  Pattern Library </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </ul>
      <button id="toggle-nav" onClick={navBarView}>
        -
      </button>
    </nav>
  );
}

export default Navigation;
