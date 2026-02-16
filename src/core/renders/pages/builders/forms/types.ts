/* -------------------------------------------------------------------------- */
/*                                   TRIGGER                                  */
/* -------------------------------------------------------------------------- */

export type TriggerLink = {
  mode: "existing";
  triggerId: string;
};

/* -------------------------------------------------------------------------- */
/*                               QUESTION TYPE                                */
/* -------------------------------------------------------------------------- */

export type QuestionType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "phone"
  | "date"
  | "boolean"
  | "single"
  | "multiple"
  | "scale"
  | "file";

/* -------------------------------------------------------------------------- */
/*                              QUESTION LOGIC                                */
/* -------------------------------------------------------------------------- */

export type Condition = {
  dependsOnQuestionId: string;
  operator: "equals" | "not_equals" | "includes";
  value: string;
};

/* -------------------------------------------------------------------------- */
/*                              OPTIONS SOURCE                                */
/* -------------------------------------------------------------------------- */

export type OptionsMode = "manual" | "list";

/* -------------------------------------------------------------------------- */
/*                                  QUESTION                                  */
/* -------------------------------------------------------------------------- */

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;

  /** Usado apenas para single / multiple quando optionsMode === "manual" */
  options: string[];

  /** Define se as opções são manuais ou vêm de uma lista */
  optionsMode?: OptionsMode;

  /** Referência da lista quando optionsMode === "list" */
  optionsListId?: string;

  /** Exibição condicional */
  condition?: Condition;

  /** Acionamento ao responder */
  trigger?: TriggerLink;
};
