import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashLayout } from "@/core/renders/layouts/DashLayout";
import { NormalLayout } from "@/core/renders/layouts/NormalLayout";

import { NotFoundRenderer } from "@/core/renders/pages/404/NotFoundRenderer";
import { MapsRenderer } from "@/core/renders/pages/maps/MapsRenderer";
import { HomeRenderer } from "@/core/renders/pages/home/HomeRenderer";
import { UsersRenderer } from "@/core/renders/pages/users/UsersRenderer";
import { TermsRenderer } from "@/core/renders/pages/terms/TermsRenderer";
import { LoginRenderer } from "@/core/renders/pages/login/LoginRenderer";
import { ExternalUsersRenderer } from "@/core/renders/pages/users_extern/UsersExternRenderer";
import { ReportRenderer } from "@/core/renders/pages/report/ReportRenderer";
import { PassEmailSendRenderer } from "@/core/renders/pages/reset_password/PassEmailSendRenderer";
import { PassEmailCodeRenderer } from "@/core/renders/pages/reset_password/PassEmailCodeRenderer";
import { PassResetRenderer } from "@/core/renders/pages/reset_password/PassResetRenderer";
import { TeamsRenderer } from "@/core/renders/pages/teams/TeamsRenderer";
import { QuestionsRenderer } from "@/core/renders/pages/questions/QuestionsRenderer";
import { InformationBuilderRenderer } from "@/core/renders/pages/builders/informations/InformationBuilderRenderer";
import { TriggerBuilderRenderer } from "@/core/renders/pages/builders/triggers/TriggerBuilderRenderer";
import { FormBuilderRenderer } from "@/core/renders/pages/builders/forms/FormBuilderRenderer";
import { TestsRenderer } from "@/core/renders/pages/tests/TestsRenderer";
import { FormTester } from "@/core/renders/pages/tests/testers/forms/FormTester";
import { MessagesRenderer } from "@/core/renders/pages/messages/MessagesRenderer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Dash layout */}
        <Route element={<DashLayout />}>
          {/* Rota Home */}
          <Route path="/" element={<HomeRenderer />} />

          {/* Rotas Users */}
          <Route path="/users" element={<UsersRenderer />} />
          <Route path="/external-users" element={<ExternalUsersRenderer />} />

          {/* Rota Teams */}
          <Route path="/teams" element={<TeamsRenderer />} />

          {/* Rotas Questions */}
          <Route path="/questions" element={<QuestionsRenderer />} />
          <Route path="/questions/builder/informations" element={<InformationBuilderRenderer />} />
          <Route path="/questions/builder/triggers" element={<TriggerBuilderRenderer />} />
          <Route path="/questions/builder/forms" element={<FormBuilderRenderer />} />

          {/* Rota de Mensagens */}
          <Route path="/messages" element={<MessagesRenderer />} />

          {/* Rotas de Teste */}
          <Route path="/tests" element={<TestsRenderer />} />
          <Route path="/tests/forms" element={<FormTester />} />

          {/* Rota Reports */}
          <Route path="/reports" element={<ReportRenderer />} />

          {/* Rota Maps */}
          <Route path="/maps" element={<MapsRenderer />} />
        </Route>

        {/* Rotas Normal layout */}
        <Route element={<NormalLayout />}>
          {/* Rotas Login/Reset Password */}
          <Route path="/login" element={<LoginRenderer />} />
          <Route path="/password/send" element={<PassEmailSendRenderer />} />
          <Route path="/password/code" element={<PassEmailCodeRenderer />} />
          <Route path="/password/reset" element={<PassResetRenderer />} />

          {/* Rota 404 */}
          <Route path="*" element={<NotFoundRenderer />} />
        </Route>

        {/* Rota Termos - Sem layout */}
        <Route path="/terms" element={<TermsRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}
