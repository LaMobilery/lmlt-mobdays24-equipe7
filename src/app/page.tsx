"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { GptRequestBody } from "./types/gpt";
import { fromUserInputsToUserAnswersToGpt } from "@/utils/fromUserInputsToUserAnswersToGpt/util";
import { userAnswersToGpt } from "@/services/userAnswersToGpt/service";
import toast, { Toaster } from "react-hot-toast";
import { useLoading } from "@/contexts/loading/context";
import { useRouter } from "next/navigation";

export type CvForm = Array<{
  question: string;
  answer: string;
  type: `${keyof GptRequestBody}-${number}`;
}>;

export default function Home() {
  const logoSize = document.body.clientWidth / 4;
  const router = useRouter();

  const questionMock: CvForm = [
    /**
 *      clientName,
    missionDescription,
      featuresList,
      methods,
      role,
      techsList,
 */
    {
      question: "Pour quel client as-tu réalisé ta mission ? (Decathlon, Kiabi, Bonduelle, etc.)",
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
      question: "Quelles fonctionnalités as-tu implémentées ou aidé à implémenter ? (login, checkout, dashboard, etc.)",
      answer: "",
      type: "featuresList-0",
    },
    {
      question: "Est-ce que tu as travaillé avec certaines méthodologies de gestion de projet ? (SCRUM, Kanban, etc.)",
      answer: "",
      type: "methods-0",
    },
    {
      question: "Quel a été ton rôle dans cette mission ? (développeur front, back, lead dev')",
      answer: "",
      type: "role-0",
    },
    {
      question: "Liste les technologies et outils que tu as utilisés (AWS, React, Postgres, etc.)",
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

  const [questions, setQuestions] = useState(questionMock);

  const handleQuestion = (i: number, answer: string) => {
    const newQuestions = [...questions];
    newQuestions[i].answer = answer;
    setQuestions(newQuestions);
  };

  const { setLoading } = useLoading();

  const onSubmit = async () => {
    setLoading(true);
    const body = fromUserInputsToUserAnswersToGpt(questions);
    try {
      const response = await userAnswersToGpt(body);
      toast.success("Ché bon", { position: "bottom-center" });
      if (response) {
        const queryParams = new URLSearchParams(Object.entries(response));
        router.push(`/answer?${queryParams.toString()}`);
      }
    } catch (error) {
      toast.error("Oups, quelqu'un a oublié d'allumer son ordinateur dans l'océan", { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainBlock}>
        <div className={styles.logo} style={{ marginTop: logoSize / 1.6 }}>
          <Image src="/logo_txt.png" width={logoSize} height={logoSize} alt="logo wizard" />
        </div>
        <h3>Une potion de suc&apos; pour briller</h3>
      </div>
      {questions.map(
        (question, i) =>
          questions[i - 1]?.answer !== "" && (
            <div className={styles.questionBlock} key={question.question}>
              <h2>{question.question}</h2>
              <div className={styles.inputContainer}>
                <div className={styles.inputBackground} />
                <input
                  type="text"
                  name={`q${i}`}
                  className={styles.answerInput}
                  value={question.answer}
                  onChange={e => handleQuestion(i, e.target.value)}
                />
              </div>
            </div>
          )
      )}

      <button onClick={onSubmit}>Wazaaa !</button>
      <Toaster />
    </main>
  );
}
