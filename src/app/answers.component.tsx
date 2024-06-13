"use client";

import React, { SyntheticEvent, useRef, useState } from 'react';
import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const [_, setCopied] = useState(false);
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState([
    { title: "Le(s) projet(s) :", answer: searchParams.get("mission") },
    {
      title: "La mission & activités & fonctions :",
      answer: searchParams.get("project"),
    },
    {
      title: "Les technologies & outils & méthodes",
      answer: searchParams.get("technos"),
    },
  ]);

  const send = () => {
    console.log("Button clicked!");
  };

  const handleCopy = (index: number) => {
    const fieldValue = formData[index].answer;
    if (typeof fieldValue === 'string') {
      navigator.clipboard
        .writeText(fieldValue)
        .then(() => {
          console.log(fieldValue);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        })
        .catch((error) => console.error('Failed to copy:', error));
    }
  };

  const textRef = useRef<any>();
  const onChangeHandler = function(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    textRef.current.style.height = "30px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  return (
    <main className={ styles.answerMain }>

      <Image
        className={ styles.answerBeta }
        src="/now_in_beta.png"
        alt="beta"
        width={160}
        height={160}
        priority
      />

      <div className={ styles.answerBlock }>
        <Image
          className={ styles.answerLogoHeader }
          src="/logo_detoured.png"
          alt="CVWizard"
          width={250}
          height={250}
          priority
        />

        <form>
          {formData.map((item, index) => (
            <div className={styles.answerLoop} key={index}>
              <label className={styles.answerTitle}>{item.title}</label>
              <div onClick={() => handleCopy(index)}>
                <Image
                  className={styles.answerCopy}
                  src="/copy.svg"
                  alt="Copy Icon"
                  width={20}
                  height={20}
                  priorityg
                />
              </div>
              <div>
                <div className={ styles.answerInput }>{item.answer ?? ''}</div>
              </div>
            </div>
          ))}
        </form>

        <div className={styles.answerBottom}>
          <button className={styles.buttonLink2} onClick={send}>
            RECOMMENCER 🪄
          </button>
          <Link href="/" className={styles.buttonLink1}>
            RETOUR
          </Link>
        </div>
      </div>
    </main>
  );
}
