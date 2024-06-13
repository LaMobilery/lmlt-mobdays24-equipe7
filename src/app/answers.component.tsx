"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from "../app/page.module.css";
import { useLoading } from "@/contexts/loading/context";
import { userAnswersToGpt } from "@/services/userAnswersToGpt/service";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const router = useRouter();
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
  const { setLoading } = useLoading();

  const send = async () => {

    const body = {
      clientName: searchParams.get("clientName")||"",
      featuresList: searchParams.get("featuresList")||"",
      methods: searchParams.get("methods")||"",
      missionDescription: searchParams.get("missionDescription")||"",
      role: searchParams.get("role")||"",
      techsList: searchParams.get("techsList")||"",
    };
    if (body.clientName === "" || body.featuresList === "" || body.methods === "" || body.missionDescription === "" || body.role === "" || body.techsList === "") {

      toast.error("Il manque des informations pour générer le CV", { position: "bottom-center" });
      return;
    }
      setLoading(true);
      try {
        const response = await userAnswersToGpt(body);
        toast.success("Ché bon", { position: "bottom-center" });
        if (response) {
          setFormData([
            { title: "Le(s) projet(s) :", answer: response.project },
            { title: "La mission & activités & fonctions :", answer: response.mission },
            { title: "Les technologies & outils & méthodes", answer: response.technos },
          ]);
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

  useEffect(() => {
    const handleKeyPress = (event: { key: string; }) => {
      if (event.key === 'k') {
        router.push('/karaoke');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [router]);

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
                />
              </div>
              <div>
                <div className={ styles.responseInput }>{item.answer ?? ''}</div>
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
      <Toaster/>

    </main>
  );
}
