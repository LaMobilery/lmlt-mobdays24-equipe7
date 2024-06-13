import React, { useState } from "react";
import { CvForm as CvFormType } from "./page";
import styles from "./page.module.css";

const Questions = ({
  questions,
  handleQuestion,
}: {
  questions: CvFormType;
  handleQuestion: (i: number, answer: string) => void;
}) => {
  return (
    <>
      {questions.map(
        (question, i) =>
          questions[i - 1]?.answer !== "" && (
            <div className={styles.questionBlock} key={question.question}>
              <h2>{question.question}</h2>

              <div className={styles.inputContainer}>
                <div className={styles.inputBackground} />
                <input
                  autoComplete="off"
                  type="text"
                  name={`q${i}`}
                  className={styles.answerInput}
                  value={question.answer}
                  onChange={(e) => handleQuestion(i, e.target.value)}
                />
              </div>
            </div>
          )
      )}
    </>
  );
};

export default Questions;
