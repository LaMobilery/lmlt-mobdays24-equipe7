import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { GptRequestBody } from "./types/gpt";
import { Toaster } from "react-hot-toast";
import Baseline from "./baseline.component";
import LogoComponent from "./logo.component";
import CvForm from "./cvform.component";

export type CvForm = Array<{
  question: string;
  answer: string;
  type: `${keyof GptRequestBody}-${number}`;
}>;

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        className={styles.answerBeta}
        src="/now_in_beta.png"
        alt="beta"
        width={160}
        height={160}
        priority
      />

      <div className={styles.mainBlock}>
        <LogoComponent />
        <Baseline />
      </div>
      <div className={styles.questionBackground}>
        <CvForm />
      </div>
      <Toaster />
    </main>
  );
}
