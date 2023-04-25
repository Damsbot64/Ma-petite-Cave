import React, { type PropsWithChildren } from "react";
import ThemeToggler from "../darkTheme/toggleColorScheme";
import AuthSignIn from "./AuthSignIn";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { Avatar } from "@mantine/core";
import { removedFamilyName } from "~/utils/functions";

const Layout = ({ children }: PropsWithChildren) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="w-full border-b-4 border-slate-400">
        <div className="flex h-32 justify-between p-3">
          <div className="flex">
            <Logo />
          </div>
          {sessionData ? (
            <div className="flex flex-col items-end justify-between">
              <div className="flex gap-4">
                <ThemeToggler />
                <AuthSignIn />
              </div>
              <div className="flex gap-4">
                <p>
                  Hello {removedFamilyName(sessionData.user.name as string)} !
                </p>
                <Avatar
                  src={sessionData.user.image}
                  alt={sessionData.user.name as string}
                  size="sm"
                  radius="xl"
                />
              </div>
            </div>
          ) : (
            <div className="flex w-[50%] flex-col items-end justify-between">
              <ThemeToggler />
              <AuthSignIn />
            </div>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
