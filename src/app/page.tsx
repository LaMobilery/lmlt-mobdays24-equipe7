"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const logoSize = document.body.clientWidth / 4;

  const questionMock = [
    {
      question: "Pour quel client as-tu réalisé ta mission ?",
      answer: "",
    },
    {
      question: "Explique brièvement le métier de ton client.",
      answer: "",
    },
    {
      question: "Quel a été ton rôle dans cette mission ?",
      answer: "",
    },
    {
      question: "A quelle période ?",
      answer: "",
    },
    {
      question: "Liste la liste des fonctionnalités auxquelles tu as contribué",
      answer: "",
    },
    {
      question: "Liste les technologies, outils et/ou méthodes que tu as utilisé",
      answer: "",
    },
    {
      question: "Quelles bonnes pratiques as-tu pu mettre en oeuvre ou découvrir ?",
      answer: "",
    },
  ];

  const [questions, setQuestions] = useState(questionMock);

  const handleQuestion = (i: number, answer: string) => {
    const newQuestions = [...questions];
    newQuestions[i].answer = answer;
    setQuestions(newQuestions);
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainBlock}>
        <div className={styles.logo} style={{ marginTop: logoSize / 1.6 }}>
          <Image src="/logo.png" width={logoSize} height={logoSize} alt="logo wizard" />
        </div>
        <h1 className={styles.title}>CVWizard</h1>
        <p>Une potion de suc' pour briller</p>
      </div>
      {questions.map(
        (question, i) =>
          questions[i - 1]?.answer !== "" && (
            <div className={styles.questionBlock} key={question.question}>
              <h2>{question.question}</h2>
              <input
                type="text"
                name={`q${i}`}
                className={styles.answerInput}
                value={question.answer}
                onChange={e => handleQuestion(i, e.target.value)}
              />
            </div>
          )
      )}

      <button>Wazaaa !</button>
    </main>
  );
}
