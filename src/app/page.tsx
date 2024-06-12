"use client";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image src="/logo.png" width={492} height={492} alt="logo wizard" />
      </div>
      <div>
        <h2>C'est la première question</h2>
        <input type="text" name="test" />
      </div>
    </main>
  );
}
