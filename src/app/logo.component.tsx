"use client";
import React from "react";
import styles from "./page.module.css";
import Logo from "../../public/logo_txt.png";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";

const LogoComponent = () => {
  const { width: windowWidthSize } = useWindowSize();
  const logoSize = windowWidthSize ? windowWidthSize / 4 : 0;
  return (
    <div className={styles.logo} style={{ marginTop: logoSize / 1.6 }}>
      <Image src={Logo} width={logoSize} height={logoSize} alt="logo wizard" />
    </div>
  );
};

export default LogoComponent;
