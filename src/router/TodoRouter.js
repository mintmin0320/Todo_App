import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import TodoListPage from '../pages/todo/TodoListPage';

export default function TodoRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={<TodoListPage />} />
      <Route
        path="/*"
        element={<div>404</div>} />
    </Routes>



  );
};