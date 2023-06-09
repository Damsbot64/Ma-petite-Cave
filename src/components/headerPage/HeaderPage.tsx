import React from "react";
import NavigationButton from "../buttons/NavigationButton";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";
import { type HeaderPageProps } from "../type";
import SortComponent from "../sort/SortComponent";

const HeaderPage = ({
  colors,
  loading,
  label,
  queries,
  onSortChange,
  sortFilter,
}: HeaderPageProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 px-2">
      <Skeleton visible={loading} style={{ width: "auto" }}>
        <NavigationButton
          size="md"
          label="retour"
          radius="md"
          onClick={() => {
            router.back();
          }}
        />
      </Skeleton>
      <Skeleton visible={loading}>
        <div
          className={`${colors} xy-center flex h-[30px] w-full rounded-md  bg-slate-500`}
        >
          <h1 className="text-lg">{label}</h1>
        </div>
      </Skeleton>
      {sortFilter && (
        <Skeleton visible={loading} style={{ width: "auto" }}>
          <SortComponent queries={queries} onSortChange={onSortChange} />
        </Skeleton>
      )}
    </div>
  );
};

export default HeaderPage;
