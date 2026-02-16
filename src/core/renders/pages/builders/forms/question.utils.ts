import { Question } from "./types";

export const createQuestion = (): Question => ({
  id: crypto.randomUUID(),
  title: "",
  type: "text",
  required: false,
  options: [],
});
