// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav/nav";
import MainHome from "./Home/MainHome";
import Footer from "./Footer";
import Connect from "./Connect/Connect";

export default function App() {
  return (
    <div className="relative">
      <Nav />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/Connect" element={<Connect />} />
        <Route
          path="*"
          element={
            <div className="text-center text-[30px] font-bold mt-[100px]">
              404 Page Not Found
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
