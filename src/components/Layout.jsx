import { Suspense } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FiBarChart, FiSearch, FiBell, FiLock } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import { CgAdd } from "react-icons/cg";
import { FcUnlock } from "react-icons/fc";
import { signOut } from "firebase/auth";
import { auth } from "../functions";
import {AiOutlineBorderlessTable} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { MenuItem } from ".";

export default function Layout({ Node, title, setSearch }) {
  const getCurrentNode = (node) => {
    return window.location.pathname === node;
  };

  const navigate = useNavigate();

  const activateSearch = (data) => {
    setSearch({
      active: true,
      searchInfo: data,
    });
  };

  // Password: testUser
  // Username: test@user.com
  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("logged");
      navigate("/login");
    });
  };
  return (
    <main className="flex flex-1 bg-gray-200 container min-h-[100vh] relative flex-col md:flex-row">
      {/* Sidebar on md */}
      <aside className="w-1/4 hidden md:flex flex-col bg-white">
        <div className="bg-teal-400 p-3">
          <h3 className="text-white text-xl">Inventory App</h3>
          <p className="text-xs">Taking all records</p>
        </div>
        <div className="p-3">
          <MenuItem path={"/dashboard"} desc={"Dashboard"} Icon={MdDashboard} />
          <MenuItem path={"/"} desc={"Store"} Icon={HiShoppingCart} />
          <MenuItem path={"/stats"} desc={"Statistics"} Icon={FiBarChart} />
          <MenuItem path={"/add-product"} desc={"Add Items"} Icon={CgAdd} />
          <MenuItem path={"/database"} desc={"Data Tables"} Icon={AiOutlineBorderlessTable} />
          <MenuItem path={"/alerts"} desc={"Notifications"} Icon={FiBell} />
        </div>

        <div className="absolute bottom-3 p-3">
          <button className="flex items-center" onClick={() => logout()}>
            <FiLock className="mr-1"/> <p>Log Out</p>
          </button>
        </div>
      </aside>
      <section className="flex-1 w-full">
        <div className="fixed top-0 w-full bg-white z-50 p-1">
          <div className="flex item-center justify-between">
            <h1 className="text-xl p-2">{title}</h1>
            <span className="flex">
              <Link to="/alerts">
                <div className="relative bg-white p-2">
                  <div className="w-4 h-4 text-center rounded-full flex justify-center m-1 items-center bg-red-600 absolute top-0 right-0">
                    <p className="text-[10px] text-white">4</p>
                  </div>
                  <FiBell className="w-7 h-7 " />
                </div>
              </Link>
              <button onClick={logout}>
                <FcUnlock className="w-7 h-7 " />
              </button>
            </span>
          </div>

          <nav className="flex items-center">
            {/* Search bar */}
            <div
              className={`items-center  p-2 ${
                title !== "Shop" ? "hidden" : "flex"
              }`}
            >
              <FiSearch className="pr-2 w-8 h-8" />{" "}
              <input
                onChange={(e) => activateSearch(e.target.value)}
                type="search"
                className="p-1"
                placeholder="Search Item"
              />
            </div>
          </nav>
        </div>

        <Suspense fallback={<>Coming Soon</>}>{Node}</Suspense>
      </section>
      {/* Bottom Navigation on Mobile */}
      <div className="fixed w-full rounded-t-3xl bg-blue-600 flex md:hidden bottom-0 w-full  justify-around items-center p-1 z-50">
        <Link
          to="/dashboard"
          className={`${
            getCurrentNode("/dashboard")
              ? "transition duration-500 ease-in-out bg-white p-1 rounded-full shadow-2xl scale-105 absolute bottom-5 border-2 border-blue-700"
              : ""
          } `}
        >
          <MdDashboard
            className={`w-8 h-8 ${
              getCurrentNode("/dashboard") ? "text-blue-500" : "text-white"
            }`}
          />
        </Link>
        <Link
          to="/"
          className={`${
            getCurrentNode("/")
              ? "transition duration-500 ease-in-out bg-white p-1 rounded-full shadow-2xl scale-105 absolute bottom-5 right-auto border-2 border-blue-700"
              : ""
          } `}
        >
          <HiShoppingCart
            className={`w-8 h-8 ${
              getCurrentNode("/") ? "text-blue-500" : "text-white"
            }`}
          />
        </Link>
        <Link
          to="/add-product"
          className={`${
            getCurrentNode("/add-product")
              ? "transition duration-500 ease-in-out bg-white p-1 rounded-full shadow-2xl scale-105 absolute bottom-5 right-auto border-2 border-blue-700"
              : ""
          } `}
        >
          <CgAdd
            className={`w-8 h-8 ${
              getCurrentNode("/add-product") ? "text-blue-500" : "text-white"
            }`}
          />
        </Link>
        <Link
          to="/stats"
          className={`${
            getCurrentNode("/stats")
              ? "transition duration-500 ease-in-out bg-white p-1 rounded-full shadow-2xl scale-105 absolute bottom-5  border-2 border-blue-700"
              : ""
          } `}
        >
          <FiBarChart
            className={`w-8 h-8 ${
              getCurrentNode("/stats") ? "text-blue-500" : "text-white"
            }`}
          />
        </Link>
      </div>
    </main>
  );
}
