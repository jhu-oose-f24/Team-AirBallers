import Button from "@/components/Button";
import { RootContext } from "@/context/RootContext";
import ProfileModal from "@/features/ProfileModal";
import { pause } from "@/util/misc";
import {
  IconChevronLeft,
  IconLayoutGrid,
  IconUserCircle,
} from "@tabler/icons-react";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Header = () => {
  const router = useRouter();

  const session = useSession();
  const {
    sideBarRef,
    sideBarOpen,
    setSideBarOpen,
    headerState: { title, back },
  } = useContext(RootContext);

  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = session.data || {};
  const signedIn = session.status === "authenticated" && user?.email;
  const signedOut = session.status !== "loading" && !user?.email;

  function goBack() {
    router.push(back);
  }

  async function toggleSideBar() {
    if (!sideBarRef) {
      setSideBarOpen(!sideBarOpen);
      return;
    }

    if (sideBarOpen) {
      setSideBarOpen(false);
      await pause(100);
      sideBarRef.style.visibility = "hidden";
    } else {
      sideBarRef.style.visibility = "visible";
      await pause(100);
      setSideBarOpen(true);
    }
  }

  return (
    <header className="app-header">
      <Button
        variant="hint"
        className="action-button"
        icon={<IconLayoutGrid />}
        onClick={toggleSideBar}
        fontSize="1.8rem"
        xPad="0.3rem"
        yPad="0.3rem"
        stretch
      />

      {title && (
        <Button
          variant="hint"
          className={clsx("title-link", back && "back")}
          icon={back && <IconChevronLeft stroke={2.8} />}
          label={title}
          onClick={() => back && router.push(back)}
          fontSize="1.8rem"
          xPad={back && "0.3rem"}
          stretch
        />
      )}

      {signedIn && (
        <Button
          className="user-pfp"
          variant="hint"
          icon={
            user?.image ? (
              <div className="pfp-image">
                <img src={user.image} />
              </div>
            ) : (
              <IconUserCircle className="pfp-image !stroke-[2]" />
            )
          }
          onClick={() => setProfileOpen(!profileOpen)}
          fontSize={user?.image ? "2rem" : "2.4rem"}
          xPad={user?.image ? "0.2rem" : "0px"}
          yPad={user?.image ? "0.2rem" : "0px"}
          borderRadius="100vmax"
        />
      )}
      {signedOut && (
        <Button
          className="sign-in"
          variant="secondary"
          label="Sign in"
          loading={session.status === "loading"}
          onClick={() => signIn("google")}
          xPad="0.6rem"
          stretch
        />
      )}

      <ProfileModal openState={[profileOpen, setProfileOpen]} />
    </header>
  );
};

export default Header;
