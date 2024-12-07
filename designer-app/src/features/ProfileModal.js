import Button from "@/components/Button";
import Modal from "@/components/Modal";
import OverflowableText from "@/components/OverflowableText";
import Tooltip from "@/components/Tooltip";
import { RootContext } from "@/context/RootContext";
import { IconBrandGoogleFilled, IconUserCircle } from "@tabler/icons-react";
import { getProviders, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

/** @type {{ [k in OAuthProvider]?: TablerIcon }} */
const providerIcons = {
  google: IconBrandGoogleFilled,
};

/** @param {ProfileModalProps} props */
const ProfileModal = (props) => {
  const { openState } = props;

  const { bodyRef } = useContext(RootContext);

  const session = useSession();
  const { user, provider } = session.data || {};
  const ProviderIcon = providerIcons[provider];

  const [profileOpen, setProfileOpen] = openState;
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    if (!provider) return;

    getProviders().then((providers) => {
      setProviderName(providers[provider]?.name);
    });
  }, [provider]);

  return (
    <Modal
      className="profile-modal"
      overlayClassName="md:!z-10"
      title="Profile"
      placement="top-right"
      offset="4rem"
      openState={[profileOpen, setProfileOpen]}
    >
      <Head>
        <title>Profile | Designer App</title>
      </Head>

      <div className="profile-summary">
        <div className="pfp-wrapper">
          {user?.image ? (
            <div className="pfp-image">
              <img src={user.image} />
            </div>
          ) : (
            <IconUserCircle className="pfp-image blank" />
          )}
          {providerName && (
            <Tooltip content={providerName} placement="right">
              <ProviderIcon className="auth-provider-icon" />
            </Tooltip>
          )}
        </div>

        <p className="profile-info">
          <OverflowableText
            as="b"
            text={user?.name}
            appendTo={bodyRef}
            placement="bottom"
          />
          <OverflowableText
            text={user?.email}
            appendTo={bodyRef}
            placement="bottom"
          />
        </p>
      </div>

      <div className="flex flex-col gap-[0.6rem]">
        {/* <Button
          variant="secondary"
          bgColor="var(--primary-lightest)"
          label="Switch Account"
          width="100%"
        /> */}
        <Button
          label="Sign out"
          yPad="0.4rem"
          width="100%"
          onClick={() => signOut({ callbackUrl: "/create" })}
        />
      </div>
    </Modal>
  );
};

export default ProfileModal;
