import { getDynamicBaseline } from "@/utils/getDynamicBaseline/util";
import React from "react";
import styles from "./page.module.css";

const Baseline = () => {
  return <h3 className={styles.baseline}>{getDynamicBaseline()}</h3>;
};

export default React.memo(Baseline);
