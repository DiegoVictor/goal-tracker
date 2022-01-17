import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../screens/home';
export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
