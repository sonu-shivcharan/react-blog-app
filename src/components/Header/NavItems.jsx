import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { useMobile } from "./useMobile";

function NavItems(props) {
  const authStatus = useSelector((state) => state.auth.status);
  const isMobile = useMobile()
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <ul className={`w-full flex justify-end items-center duration-500 nav ${isMobile?"flex-col gap-3":""}`}>
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name} className="flex justify-center">
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "dark:bg-emerald-500 bg-emerald-600" : ""
                } px-4 p-2 border border-gray-600 rounded mx-1 duration-100
                ${isMobile?"w-[200px] mx-auto":""}
                `
              }
              to={item.slug}
            >
              {item.name}
            </NavLink>
          </li>
        ) : null
      )}
      {authStatus && (
        <li>
          <LogoutBtn className="flex justify-center" />
        </li>
      )}
    </ul>
  );
}

export default NavItems;
