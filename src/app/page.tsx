"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const logoSize = document.body.clientWidth / 4;

  return (
    <main className={styles.main}>
      <div className={styles.mainBlock}>
        <div className={styles.logo} style={{ marginTop: logoSize / 1.6 }}>
          <Image src="/logo.png" width={logoSize} height={logoSize} alt="logo wizard" />
        </div>
        <h1 className={styles.title}>CVWizard</h1>
        <p>Wingardium Leviosaaaaaa</p>
      </div>
      <div className={styles.questionBlock}>
        <h2>C'est la première question ?</h2>
        <input type="text" name="test" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>C'est la première question ?</h2>
        <input type="text" name="test" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>C'est la première question ?</h2>
        <input type="text" name="test" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>C'est la première question ?</h2>
        <input type="text" name="test" className={styles.answerInput} />
      </div>
    </main>
  );
}
