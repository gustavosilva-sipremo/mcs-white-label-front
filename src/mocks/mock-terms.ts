import { Term } from "@/components/sections/Terms";

export const TERMS_MOCK: Term[] = [
  {
    id: 1,
    title: "Termo de Uso & Política de Privacidade",
    description: `O presente Termo de Uso estabelece as condições gerais para acesso e utilização da aplicação disponibilizada pela Sipremo Tecnologia Ltda, destinada ao suporte, comunicação e gerenciamento das atividades relacionadas ao fluxo do PAE. 
Ao acessar ou utilizar a aplicação, o usuário declara ter lido, compreendido e concordado integralmente com as disposições aqui previstas, comprometendo-se a utilizar o sistema exclusivamente para as finalidades a que se destina, em conformidade com a legislação vigente, a boa-fé objetiva, a ética e as normas aplicáveis. 
O acesso à aplicação é pessoal, individual e intransferível, sendo de responsabilidade exclusiva do usuário a guarda, o sigilo e o uso adequado de suas credenciais de acesso, bem como todas as ações realizadas a partir de sua conta. 
A Sipremo Tecnologia Ltda não se responsabiliza por danos diretos ou indiretos decorrentes de uso inadequado da aplicação, indisponibilidade temporária do sistema, falhas técnicas, eventos de caso fortuito ou força maior, bem como por atos praticados por terceiros.`,
    required: true,
  },
  {
    id: 2,
    title: "Termo de Consentimento LGPD",
    description: `Em conformidade com a Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD), declaro meu consentimento livre, informado e expresso para o tratamento dos meus dados pessoais pela Sipremo Tecnologia Ltda, nos limites e condições descritos neste termo. 
Finalidade do tratamento: os dados fornecidos, como e-mail e telefone, serão utilizados para comunicação, envio de notificações, alertas e informações necessárias ao funcionamento da aplicação, podendo também ser compartilhados com parceiros e prestadores de serviços, observando-se os princípios da necessidade, proporcionalidade e segurança. 
Segurança e confidencialidade: a empresa se compromete a adotar medidas técnicas e administrativas adequadas para proteger os dados contra acessos não autorizados e qualquer forma de tratamento inadequado ou ilícito. 
Revogação: o consentimento pode ser revogado a qualquer momento, ciente de que a revogação poderá inviabilizar o uso parcial ou total da aplicação.`,
    required: true,
  },
  {
    id: 3,
    title: "Aceite para Receber Newsletter",
    description: `Autorizo o envio de comunicados, novidades, promoções e conteúdos relevantes da plataforma através do e-mail cadastrado. 
Este termo é opcional, e você poderá revogar o consentimento a qualquer momento, sem prejuízo do uso da aplicação. 
As informações enviadas serão restritas a marketing e notificações de interesse do usuário, sem compartilhamento de dados para fins de terceiros fora do escopo da plataforma.`,
    required: false,
  },
];
