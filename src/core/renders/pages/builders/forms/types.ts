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

export type Condition = {
  dependsOnQuestionId: string;
  operator: "equals" | "not_equals" | "includes";
  value: string;
};

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[];
  condition?: Condition;
};
