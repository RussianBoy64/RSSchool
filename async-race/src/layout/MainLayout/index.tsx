import { FC, ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface MainLayoutType {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutType> = function mainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
