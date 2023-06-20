import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Stats from "./pages/Stats";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { readData } from "./functions/calls";
import { SearchContext } from "./assets/data";
import Notification from "./pages/Notification";
import { Navigate } from "react-router-dom";
import Table from "./pages/Tables";


export const Private = ({ Node, title, setSearch }) => {
  
  const logged = localStorage.getItem("logged");

  return logged ? (
    <Layout Node={Node} title={title} setSearch={setSearch}/>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

function App() {
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [activeSearch, setSearch] = useState({
    active: false,
    searchInfo: "",
  });

  useEffect(() => {
    readData({
      path: "products",
      getData: setItems,
    });

    readData({
      path: "sales",
      getData: setSales,
    });
  }, [items, sales]);

  return (
    <SearchContext.Provider value={activeSearch}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Private
                setSearch={setSearch}
                Node={<Home search={activeSearch} />}
                title="Shop"
              />
            }
            exact
          />
          <Route
            path="/dashboard"
            element={
              <Private
                Node={<Dashboard items={items} sales={sales} />}
                title="Dashboard"
              />
            }
            exact
          />
          <Route
            path="/add-product"
            element={<Private Node={<AddProduct />} title="Add Product" />}
          />
          <Route
            path="/stats"
            element={
              <Private
                Node={<Stats items={items} sales={sales} />}
                title="Statistics"
              />
            }
          />
          <Route
            path="/database"
            element={
              <Private
                Node={<Table items={items} sales={sales} />}
                title="Data Tables"
              />
            }
          />

          <Route path="/alerts" element={<Private title={"Notifications"} Node={<Notification />} />} />
        </Routes>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
