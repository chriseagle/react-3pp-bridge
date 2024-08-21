import { memo } from "react";
import styles from "./page.module.css";
import { PubSubComponent } from "./components/PubSubComponent";
import { SubComponent } from "./components/SubComponent";

const FauxTarget = memo(
  function FauxTarget() {
    return <div id="faux-target"></div>;
  },
  () => true
);

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>React 3PP Bridge Test App</h1>
      <PubSubComponent />
      <SubComponent />
      <FauxTarget />
    </main>
  );
}
