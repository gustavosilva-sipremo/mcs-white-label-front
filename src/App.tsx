import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutRenderer } from "@/core/renders/layouts/LayoutRenderer";
import { HomeRenderer } from "@/core/renders/HomeRenderer";
import { UsersRenderer } from "@/core/renders/UsersRenderer";
import { TermsRenderer } from "@/core/renders/TermsRenderer";
import { LoginRenderer } from "@/core/renders/LoginRenderer";
import { ExternalUsersRenderer } from "@/core/renders/UsersExternRenderer";
import ReportRenderer from "./core/renders/ReportRenderer";

import { PassEmailSendRenderer } from "@/core/renders/password/PassEmailSendRenderer";
import { PassEmailCodeRenderer } from "@/core/renders/password/PassEmailCodeRenderer";
import { PassResetRenderer } from "@/core/renders/password/PassResetRenderer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam layout */}
        <Route element={<LayoutRenderer />}>
          <Route path="/" element={<HomeRenderer />} />
          <Route path="/users" element={<UsersRenderer />} />
          <Route path="/external-users" element={<ExternalUsersRenderer />} />
          <Route path="/reports" element={<ReportRenderer />} />
        </Route>

        {/* Rotas fora do layout */}
        <Route path="/terms" element={<TermsRenderer />} />
        <Route path="/login" element={<LoginRenderer />} />

        {/* Rotas de reset de senha */}
        <Route path="/password/send" element={<PassEmailSendRenderer />} />
        <Route path="/password/code" element={<PassEmailCodeRenderer />} />
        <Route path="/password/reset" element={<PassResetRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}
