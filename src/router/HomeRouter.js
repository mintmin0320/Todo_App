import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from '../pages/home/HomePage';

export default function HomeRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />} />
    </Routes>
  );
};