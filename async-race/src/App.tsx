import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <MainLayout>
          <div>Hello</div>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
