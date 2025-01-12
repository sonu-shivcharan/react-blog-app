import React, { createContext, useContext, useState } from "react";
import NavItems from "./NavItems";

export const SideNavContext = createContext({
  isSidenavOpen: false,
  setSidenav: () => {},
});

export const SideNavContextProvider = ({ children }) => {
  const [isSidenavOpen, setSidenav] = useState(false);
  return (
    <SideNavContext.Provider value={{ isSidenavOpen, setSidenav }}>
      {children}
    </SideNavContext.Provider>
  );
};

function Sidenav() {
  const { isSidenavOpen, setSidenav } = useContext(SideNavContext);
  function handleCloseSidenav(e){
    if(e.target.id==="backdrop" || e.target.tagName==="A"){
        setSidenav(false)
    }
  }
  return (
    <div
      onClick={handleCloseSidenav}
      id="backdrop"
      className={`h-screen w-screen bg-gray-950/90 fixed top-0 left-0 backdrop-blur-sm duration-300 ${
        isSidenavOpen ? "block" : "hidden"
      }`}
    >
      <div
        id="sidenav"
        className="h-screen min-w-[250px] z-20 p-4 bg-gray-900 border-l rounded-l-sm border-slate-600 fixed top-0 right-0"
      >
        <NavItems />
      </div>
    </div>
  );
}

export default Sidenav;
