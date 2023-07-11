import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeRouter from './HomeRouter';
import TodoRouter from './TodoRouter';

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeRouter />} />
      <Route path="/todo/*" element={<TodoRouter />} />
      <Route path="/*" element={<div>404</div>} />
    </Routes>
  );
};