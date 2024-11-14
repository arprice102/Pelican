import styles from "./page.module.scss";
import PelicanApp from "./components/PelicanApp";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <PelicanApp />
    </main>
  )
}