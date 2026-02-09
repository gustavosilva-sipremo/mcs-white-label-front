import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutRenderer } from "@/core/renders/layouts/LayoutRenderer";
import { HomeRenderer } from "@/core/renders/HomeRenderer";
import { UsersRenderer } from "@/core/renders/UsersRenderer";
import { TermsRenderer } from "@/core/renders/TermsRenderer";
import { LoginRenderer } from "./core/renders/LoginRenderer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam layout */}
        <Route element={<LayoutRenderer />}>
          <Route path="/" element={<HomeRenderer />} />
          <Route path="/users" element={<UsersRenderer />} />
        </Route>

        {/* Rotas fora do layout */}
        <Route path="/terms" element={<TermsRenderer />} />
        <Route path="/login" element={<LoginRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}
