"use client";
import { useLoading } from "@/contexts/loading/context";
import { userAnswersToGpt } from "@/services/userAnswersToGpt/service";
import { fromUserInputsToUserAnswersToGpt } from "@/utils/fromUserInputsToUserAnswersToGpt/util";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./page.module.css";
import Questions from "./questions.component";
import { CvForm as CvFormType } from "./page";
const hardCodedQuestions: CvFormType = [
  {
    question:
      "Pour quel client as-tu réalisé ta mission ? (Decathlon, Kiabi, Bonduelle, etc.)",
    answer: "",
    type: "clientName-0",
  },
  {
    question:
      "Explique brièvement le métier de ton client (gestionnaire de flottes, association d'aide aux malvoyants, etc.)",
    answer: "",
    type: "missionDescription-0",
  },
  {
    question:
      "Quelles fonctionnalités as-tu implémentées ou aidé à implémenter ? (login, checkout, dashboard, etc.)",
    answer: "",
    type: "featuresList-0",
  },
  {
    question:
      "Est-ce que tu as travaillé avec certaines méthodologies de gestion de projet ? (SCRUM, Kanban, etc.)",
    answer: "",
    type: "methods-0",
  },
  {
    question:
      "Quel a été ton rôle dans cette mission ? (développeur front, back, lead dev')",
    answer: "",
    type: "role-0",
  },
  {
    question:
      "Liste les technologies et outils que tu as utilisés (AWS, React, Postgres, etc.)",
    answer: "",
    type: "techsList-0",
  },
  {
    question:
      "Côté code, quelles bonnes pratiques as-tu pu mettre en oeuvre ou découvrir ? (tests unitaires, clean archi, etc.)",
    answer: "",
    type: "techsList-1",
  },
];

const CvForm = () => {
  const router = useRouter();

  const { setLoading } = useLoading();

  const [questions, setQuestions] = useState(hardCodedQuestions);

  const handleQuestion = (i: number, answer: string) => {
    const newQuestions = [...questions];
    newQuestions[i].answer = answer;
    setQuestions(newQuestions);
  };

  const onSubmit = async () => {
    setLoading(true);
    const body = fromUserInputsToUserAnswersToGpt(questions);
    try {
      const response = await userAnswersToGpt(body);
      toast.success("Ché bon", { position: "bottom-center" });
      if (response) {
        const queryParams = new URLSearchParams(
          Object.entries({ ...response, ...body })
        );
        router.push(`/answer?${queryParams.toString()}`);
      }
    } catch (error) {
      toast.error(
        "Oups, quelqu'un a oublié d'allumer son ordinateur dans l'océan",
        { position: "bottom-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  const cvFormCanBeSubmit = questions.every((question) =>
    Boolean(question.answer)
  );
  return (
    <div>
      <Questions questions={questions} handleQuestion={handleQuestion} />
      <button
        disabled={!cvFormCanBeSubmit}
        className={styles.buttonLink1}
        onClick={onSubmit}
      >
        DO YOUR MAGIC THING 🪄
      </button>
    </div>
  );
};

export default CvForm;
