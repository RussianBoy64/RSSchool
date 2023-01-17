import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import routes from "./routes";

import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <MainLayout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
