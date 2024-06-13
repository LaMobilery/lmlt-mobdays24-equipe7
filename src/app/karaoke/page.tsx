"use client";

import React from 'react';
import styles from "../page.module.css";
import Image from "next/image";
import YouTube from 'react-youtube';

export default function Page() {
  const opts = {
    height: '600',
    width: '1000',
    playerVars: {
      autoplay: 0,
    },
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

        <YouTube className={styles.video} videoId={'HbDLzCVsTSg'} opts={opts} />
        <YouTube className={styles.video} videoId={'1MMH-1UMN40'} opts={opts} />
        <YouTube className={styles.lastVideo} videoId={'jyRB5WFmTAM'} opts={opts} />

      </div>
    </main>
  );
}
