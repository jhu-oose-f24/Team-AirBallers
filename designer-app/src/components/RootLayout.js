"use client";

import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import SideBar from "@/components/SideBar";
import RootContextProvider from "@/context/RootContext";
import SideBarProvider from "@/context/SideBarContext";

const RootLayout = ({ children }) => {
  return (
    <RootContextProvider>
      <Header />

      <div className="root-container">
        <SideBarProvider>
          <SideBar />
        </SideBarProvider>
        <ScrollContainer className="page-content">{children}</ScrollContainer>
      </div>
    </RootContextProvider>
  );
};

export default RootLayout;
