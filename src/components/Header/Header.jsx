import React, { useContext } from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import NavItems from "./NavItems";
import { useMobile } from "./useMobile";
import Sidenav, { SideNavContext } from "./Sidenav";
function Header() {
  const { setSidenav } = useContext(SideNavContext);

  const isMobile = useMobile();
  return (
    <header className="bg-slate-900 border-b border-slate-600 font-semibold p-2 w-full h-[70px] flex items-center justify-between fixed left-0 z-20">
      <Container className="md:flex md:justify-between">
        <nav className="w-full flex items-center justify-between">
          <div className="px-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {!isMobile ? (
            <NavItems></NavItems>
          ) : (
            <>
              <span className="text-white border border-1 border-gray-600 p-2 rounded-md" onClick={() => setSidenav(true)}>
                <svg
                  className="w-5"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
                  />
                </svg>
              </span>
              <Sidenav />
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
