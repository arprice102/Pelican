import styles from "./page.module.css";
import WeatherContainer from "./components/WeatherContainer.jsx";

export default function WeatherApp() {
  return (
    <main className={styles.main}>
      {/*<SearchBox />*/}
      {/*<FrequencyToggleButton*/}
      <WeatherContainer />
    </main>
  );
}
