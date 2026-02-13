import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutRenderer } from "@/core/renders/layouts/LayoutRenderer";
import { NotFoundRenderer } from "@/core/renders/pages/404/NotFoundRenderer";
import { HomeRenderer } from "@/core/renders/pages/home/HomeRenderer";
import { UsersRenderer } from "@/core/renders/pages/users/UsersRenderer";
import { TermsRenderer } from "@/core/renders/pages/terms/TermsRenderer";
import { LoginRenderer } from "@/core/renders/pages/login/LoginRenderer";
import { ExternalUsersRenderer } from "@/core/renders/pages/users_extern/UsersExternRenderer";
import ReportRenderer from "./core/renders/pages/report/ReportRenderer";

import { PassEmailSendRenderer } from "@/core/renders/pages/reset_password/PassEmailSendRenderer";
import { PassEmailCodeRenderer } from "@/core/renders/pages/reset_password/PassEmailCodeRenderer";
import { PassResetRenderer } from "@/core/renders/pages/reset_password/PassResetRenderer";

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

        {/* Rota 404 */}
        <Route path="*" element={<NotFoundRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}
