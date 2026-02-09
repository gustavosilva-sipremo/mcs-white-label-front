import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutRenderer } from "@/core/renders/layouts/LayoutRenderer";
import { HomeRenderer } from "@/core/renders/HomeRenderer";
import { UsersRenderer } from "@/core/renders/UsersRenderer";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutRenderer>
        <Routes>
          <Route path="/" element={<HomeRenderer />} />
          <Route path="/users" element={<UsersRenderer />} />
        </Routes>
      </LayoutRenderer>
    </BrowserRouter>
  );
}
