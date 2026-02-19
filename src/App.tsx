import { BrowserRouter, Routes, Route } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                                   Layouts                                  */
/* -------------------------------------------------------------------------- */
import { DashLayout } from "@/core/renders/layouts/DashLayout";
import { NormalLayout } from "@/core/renders/layouts/NormalLayout";

/* -------------------------------------------------------------------------- */
/*                                   Páginas                                  */
/* -------------------------------------------------------------------------- */
import { HomeRenderer } from "@/core/renders/pages/home/HomeRenderer";
import { PublicHomeRenderer } from "@/core/renders/pages/home_public/HomeRenderer";

import { LoginRenderer } from "@/core/renders/pages/login/LoginRenderer";
import { TermsRenderer } from "@/core/renders/pages/terms/TermsRenderer";
import { NotFoundRenderer } from "@/core/renders/pages/404/NotFoundRenderer";

/* -------------------------------------------------------------------------- */
/*                                 Usuários                                   */
/* -------------------------------------------------------------------------- */
import { UsersRenderer } from "@/core/renders/pages/users/UsersRenderer";
import { ExternalUsersRenderer } from "@/core/renders/pages/users_extern/UsersExternRenderer";

/* -------------------------------------------------------------------------- */
/*                                  Estrutura                                 */
/* -------------------------------------------------------------------------- */
import { TeamsRenderer } from "@/core/renders/pages/teams/TeamsRenderer";
import { CompaniesRenderer } from "@/core/renders/pages/companies/CompaniesRenderer";
import { ContractsRenderer } from "@/core/renders/pages/contracts/ContractsRenderer";

/* -------------------------------------------------------------------------- */
/*                                Questionários                               */
/* -------------------------------------------------------------------------- */
import { QuestionsRenderer } from "@/core/renders/pages/questions/QuestionsRenderer";
import { InformationBuilderRenderer } from "@/core/renders/pages/builders/informations/InformationBuilderRenderer";
import { TriggerBuilderRenderer } from "@/core/renders/pages/builders/triggers/TriggerBuilderRenderer";
import { FormBuilderRenderer } from "@/core/renders/pages/builders/forms/FormBuilderRenderer";

/* -------------------------------------------------------------------------- */
/*                                 Funcionalidades                            */
/* -------------------------------------------------------------------------- */
import { MessagesRenderer } from "@/core/renders/pages/messages/MessagesRenderer";
import { AuthorizationRenderer } from "@/core/renders/pages/authorization/AuthorizationRenderer";
import { FlowRenderer } from "@/core/renders/pages/flow/FlowRenderer";
import { ReportRenderer } from "@/core/renders/pages/report/ReportRenderer";
import { MapsRenderer } from "@/core/renders/pages/maps/MapsRenderer";

/* -------------------------------------------------------------------------- */
/*                             Recuperação de Senha                           */
/* -------------------------------------------------------------------------- */
import { PassEmailSendRenderer } from "@/core/renders/pages/reset_password/PassEmailSendRenderer";
import { PassEmailCodeRenderer } from "@/core/renders/pages/reset_password/PassEmailCodeRenderer";
import { PassResetRenderer } from "@/core/renders/pages/reset_password/PassResetRenderer";

/* -------------------------------------------------------------------------- */
/*                                   Testes                                   */
/* -------------------------------------------------------------------------- */
import { TestsRenderer } from "@/core/renders/pages/tests/TestsRenderer";
import { FormTester } from "@/core/renders/pages/tests/testers/forms/FormTester";
import { RoutesTester } from "@/core/renders/pages/tests/testers/routes/RoutesTester";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================== DASH LAYOUT ============================== */}
        <Route element={<DashLayout />}>
          {/* Home */}
          <Route path="/" element={<HomeRenderer />} />

          {/* Usuários */}
          <Route path="/users" element={<UsersRenderer />} />
          <Route path="/external-users" element={<ExternalUsersRenderer />} />

          {/* Estrutura */}
          <Route path="/teams" element={<TeamsRenderer />} />
          <Route path="/companies" element={<CompaniesRenderer />} />
          <Route path="/contracts" element={<ContractsRenderer />} />

          {/* Questionários */}
          <Route path="/questions" element={<QuestionsRenderer />} />
          <Route
            path="/questions/builder/informations"
            element={<InformationBuilderRenderer />}
          />
          <Route
            path="/questions/builder/triggers"
            element={<TriggerBuilderRenderer />}
          />
          <Route
            path="/questions/builder/forms"
            element={<FormBuilderRenderer />}
          />

          {/* Funcionalidades */}
          <Route path="/messages" element={<MessagesRenderer />} />
          <Route path="/authorizations" element={<AuthorizationRenderer />} />
          <Route path="/flow" element={<FlowRenderer />} />
          <Route path="/reports" element={<ReportRenderer />} />
          <Route path="/maps" element={<MapsRenderer />} />

          {/* Testes */}
          <Route path="/tests" element={<TestsRenderer />} />
          <Route path="/tests/forms" element={<FormTester />} />
          <Route path="/tests/routes" element={<RoutesTester />} />
        </Route>

        {/* ============================ NORMAL LAYOUT ============================== */}
        <Route element={<NormalLayout />}>
          {/* Autenticação */}
          <Route path="/login" element={<LoginRenderer />} />

          {/* Recuperação de senha */}
          <Route path="/password/send" element={<PassEmailSendRenderer />} />
          <Route path="/password/code" element={<PassEmailCodeRenderer />} />
          <Route path="/password/reset" element={<PassResetRenderer />} />

          {/* Acionamento público */}
          <Route
            path="/public-occurrence-trigger"
            element={<PublicHomeRenderer />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundRenderer />} />
        </Route>

        {/* ============================ SEM LAYOUT ============================== */}
        <Route path="/terms" element={<TermsRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}