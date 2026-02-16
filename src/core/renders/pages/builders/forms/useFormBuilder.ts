import { useState } from "react";
import { Question } from "./types";
import { createQuestion } from "./question.utils";

export function useFormBuilder() {
  const [questions, setQuestions] = useState<Question[]>([createQuestion()]);

  const addQuestion = () => setQuestions((q) => [...q, createQuestion()]);

  const updateQuestion = (id: string, data: Question) => {
    setQuestions((q) => q.map((x) => (x.id === id ? data : x)));
  };

  const removeQuestion = (id: string) => {
    setQuestions((q) => q.filter((x) => x.id !== id));
  };

  const moveQuestion = (index: number, dir: "up" | "down") => {
    setQuestions((q) => {
      const next = [...q];
      const target = dir === "up" ? index - 1 : index + 1;
      if (!next[target]) return q;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    moveQuestion,
  };
}
