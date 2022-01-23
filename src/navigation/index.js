import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GoalsContextProvider } from 'contexts/GoalsContext';
import Dashboard from 'screens/dashboard';
import Home from 'screens/home';

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <GoalsContextProvider>
              <Dashboard />
            </GoalsContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
