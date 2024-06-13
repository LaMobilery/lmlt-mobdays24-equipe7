"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Answers() {
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
    const fieldValue = formData[index].answer as string;
    navigator.clipboard
      .writeText(fieldValue)
      .then(() => {
        console.log(fieldValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  const handleChange = (index: number, newValue: string) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index].answer = newValue;
      return updatedFormData;
    });
  };

  return (
    <main className={styles.answer}>
      <div className={styles.form}>
        <h1 className={styles.center}>CV WIZARD</h1>

        <form>
          {formData.map((item, index) => (
            <div className={styles.search} key={index}>
              <label className={styles.answerTitle}>{item.title}</label>
              <div onClick={() => handleCopy(index)}>
                <Image
                  className={styles.faSearch}
                  src="/deposer.png"
                  alt="Copy Icon"
                  width={20}
                  height={20}
                  priority
                />
              </div>
              <input
                className={styles.input}
                type="text"
                value={item.answer || ""}
                name={`result${index + 1}`}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </form>

        <div className={styles.container}>
          <Link href="/" className={styles.item}>
            Retour
          </Link>
          <button className={styles.item} onClick={send}>
            Envoyer
          </button>
        </div>
      </div>
    </main>
  );
}
