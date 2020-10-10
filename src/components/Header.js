import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <header id="header" className="topbar-sticky-shrink-header"></header>

      <div data-sticky-container>
        <div
          data-sticky
          data-margin-top="0"
          data-top-anchor="header:bottom"
          data-btm-anchor="content:bottom"
        >
          <div className="top-bar topbar-sticky-shrink">
            <div className="top-bar-title">
              <Link className="logo" to="/">
                Conduit
              </Link>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                {/* {user && user.token ? (
                    <> */}
                
                {/* </> */}
                {/* ) : ( */}
                <>
                  
                </>
                {/* )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <br />
    </>
  );
}

export default Header;
