import "./app.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Topbar from "./components/topbar/Topbar";
import { Route, Routes } from "react-router-dom";
import TopPage from "./components/main/topPage/TopPage";
import DetailView from "./components/main/detailView/DetailView";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  });

  return (
    <div className="App">
      <header>
        <Topbar />
      </header>
      <main>
        <Routes>
          <Route index element={<TopPage confFile="" />} />
          <Route
            path="/201/*"
            element={<DetailView deviceIdentifier="201" />}
          />
          <Route
            path="/202/*"
            element={<DetailView deviceIdentifier="202" />}
          />
          <Route
            path="/203/*"
            element={<DetailView deviceIdentifier="203" />}
          />
          <Route
            path="/204/*"
            element={<DetailView deviceIdentifier="204" />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
