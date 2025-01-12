import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import {Outlet} from "react-router-dom"
import {SideNavContextProvider } from "./components/Header/Sidenav";
function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("Error : getCurrentUser : ", err);
        console.log("Logging out");
        dispatch(logout())
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <div className="min-h-screen text-gray-400 flex justify-center items-center text-xl font-semibold">Loading...</div>
  }else{
    return (<div>

      <SideNavContextProvider>
      <Header/>
      </SideNavContextProvider>
      <main className="min-h-screen pt-[70px] flex flex-col justify-center">
      <Outlet/>
      </main>
      <Footer></Footer>
    </div>)
  }
}

export default App;
