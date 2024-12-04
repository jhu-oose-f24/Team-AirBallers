import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import SideBar from "@/components/SideBar";
import RootContextProvider from "@/context/RootContext";
import SideBarContextProvider from "@/context/SideBarContext";

const RootLayout = ({ children }) => {
  return (
    <RootContextProvider>
      <Header />

      <div className="root-container">
        <SideBarContextProvider>
          <SideBar />
        </SideBarContextProvider>
        <ScrollContainer className="page-content" manageMenuSingleton>
          {children}
        </ScrollContainer>
      </div>
    </RootContextProvider>
  );
};

export default RootLayout;
