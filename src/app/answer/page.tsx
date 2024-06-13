import { Suspense } from "react";
import Answers from "../answers.component";

export default function Page() {
  return (
    <Suspense>
      <Answers />
    </Suspense>
  );
}
