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
        <h2>Pour quel client as-tu réalisé ta mission ?</h2>
        <input type="text" name="q1" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>Explique brièvement le métier de ton client.</h2>
        <input type="text" name="q2" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>Quel a été ton rôle dans cette mission ?</h2>
        <input type="text" name="q3" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>A quelle période ?</h2>
        <input type="text" name="q4" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>Liste la liste des fonctionnalités auxquelles tu as contribué</h2>
        <input type="text" name="q5" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>Liste les technologies, outils et/ou méthodes que tu as utilisé</h2>
        <input type="text" name="q6" className={styles.answerInput} />
      </div>
      <div className={styles.questionBlock}>
        <h2>Quelles bonnes pratiques as-tu pu mettre en oeuvre ou découvrir ?</h2>
        <input type="text" name="q7" className={styles.answerInput} />
      </div>
      <button>Wazaaa !</button>
    </main>
  );
}
