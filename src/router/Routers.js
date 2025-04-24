import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Thanks from "../pages/Thanks";
import Home from "./../pages/Home";
import SearchResultList from "./../pages/SearchResultList";
import TourDetails from "./../pages/TourDetails";
import Tours from "./../pages/Tours";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/tours/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
