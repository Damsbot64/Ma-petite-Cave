import { useMantineTheme } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import NavigationButton from "~/components/buttons/NavigationButton";
import { LoaderRing } from "~/components/loader/loaderRing";
import Unauthorized from "~/components/unauthorized/Unauthorized";
import WineListTemplate from "~/components/wineList/wineList";
import { useGetAllWineByVintage } from "~/utils/APICalls/wines";

const VintagePage = () => {
  const { data: sessionData } = useSession();
  const theme = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;

  const dark = theme.colorScheme === "dark";

  const {
    data: wineListData,
    error,
    isLoading,
  } = useGetAllWineByVintage(parseInt(id as unknown as string));

  if (sessionData === null) {
    return <Unauthorized />;
  }
  if (error) {
    return <div>error</div>;
  }
  if (isLoading) {
    return (
      <div className="xy-center flex h-full w-full">
        <LoaderRing />
      </div>
    );
  }

  return (
    <div className="flexcol gap-3">
      <div className="flex gap-2">
        <NavigationButton
          size="sm"
          label="retour"
          radius="md"
          onClick={() => {
            router.push("/homepage").catch((err) => console.log(err));
          }}
        />
        <div
          className={`xy-center flex h-[26px] w-full rounded-md ${
            dark ? "bg-[#2C2E33]" : "bg-[#DEE2E6]"
          }`}
        >
          <h1 className="text-lg">{id}</h1>
        </div>
      </div>
      <div className="mx-5">
        <WineListTemplate wines={wineListData} />
      </div>
    </div>
  );
};

export default VintagePage;