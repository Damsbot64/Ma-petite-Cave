import React, { useCallback, useEffect, useState } from "react";
import { Carousel, type Embla } from "@mantine/carousel";
import { Progress, Skeleton, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import type { BottleFormat, Color } from "@prisma/client";
import Image from "next/image";
import { type CarouselProps } from "../type";
import HeaderCarousel from "./HeaderCarousel";

function CarouselWine({
  colorData,
  wineData,
  vintageData,
  wineBottlesFormat,
  colors,
  align,
  paddingProps,
}: CarouselProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);
  return (
    <div>
      {wineData && (
        <HeaderCarousel loading={loading} label="Mes Vins" url="wines" />
      )}

      {wineBottlesFormat && (
        <HeaderCarousel
          loading={loading}
          label="Mes Formats"
          url="wines/format"
        />
      )}
      {vintageData && (
        <HeaderCarousel
          loading={loading}
          label="Mes Millésimes"
          url="wines/vintage"
        />
      )}

      <Carousel
        withControls={false}
        getEmblaApi={setEmbla}
        slideSize="25%"
        loop
        align={align ?? "start"}
        dragFree
        slideGap={1}
        speed={5}
        styles={{
          root: {
            ".mantine-1my8u2w": {
              paddingLeft: paddingProps ?? "6px !important",
            },
          },
        }}
      >
        {colorData?.map((color: Color) => {
          const coloor = colors ? colors[color.id] : "bg-gray-500";
          return (
            <Carousel.Slide key={color.id} style={{ marginBottom: "14px" }}>
              <Link
                href={{
                  pathname: "/wines/category/[id]",
                  query: { id: color.id },
                }}
              >
                <div className="flexcol xy-center gap-2">
                  <Skeleton
                    visible={loading}
                    height={56}
                    width={56}
                    radius="xl"
                  >
                    <div className="x-center flex w-full">
                      <div className="flex w-fit rounded-full border-2 border-gray-400 p-[2px]">
                        <div
                          className={`${
                            coloor as string
                          }  h-14 w-14  rounded-full`}
                        />
                      </div>
                    </div>
                  </Skeleton>
                  <Skeleton visible={loading}>
                    <p className="x-center flex w-full  font-sans text-sm font-bold">
                      {color.name}
                    </p>
                  </Skeleton>
                </div>
              </Link>
            </Carousel.Slide>
          );
        })}
        {wineData?.map((wine) => {
          const coloor = colors ? colors[wine.wineColorId] : "bg-gray-500";
          return (
            <Carousel.Slide
              key={wine.id}
              style={{
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                boxShadow: "3px 3px 7px rgba(0, 0, 0, 0.35)",
                borderRadius: "6px",
                margin: "8px ",
                width: "192px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  key={wine.id}
                  href={{
                    pathname: "/wines/[id]",
                    query: { id: wine.id },
                  }}
                >
                  <div className="w-48">
                    <div
                      className={`${coloor as string} h-3 w-48 rounded-t-md`}
                    />
                    <div className="flexcol y-center h-[255px] w-48 rounded-md  text-center text-xs">
                      <div className="relative h-full w-full">
                        <Image
                          src={wine.image ?? "/images/black_crows.jpg"}
                          alt={wine.name}
                          fill
                          className="rounded-b-md object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 z-10 h-16 w-[192px] rounded-b-md bg-white p-2 text-left  font-bold text-black opacity-60">
                        <div className="flexcol flex h-full justify-around">
                          <p className="truncate text-[14px]">
                            {wine.name.toUpperCase()}
                          </p>
                          <p className="">{wine.vintage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
        {wineBottlesFormat?.map((format: BottleFormat) => {
          return (
            <Carousel.Slide
              key={format.id}
              style={{
                boxShadow: "3px 3px 7px rgba(0, 0, 0, 0.35)",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                borderRadius: "10px",
                margin: "6px",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "5px",
                marginRight: "6px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  href={{
                    pathname: "/wines/format/[id]",
                    query: { id: format.id },
                  }}
                >
                  <div className="truncate text-center">
                    <p className="font-sans text-sm font-bold">{format.name}</p>
                    <p className="font-sans text-sm font-bold">{`(${format.capacity})`}</p>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}

        {vintageData?.map((vintage) => {
          return (
            <Carousel.Slide
              key={vintage.vintage}
              style={{
                boxShadow: "3px 3px 7px rgba(0, 0, 0, 0.35)",
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                borderRadius: "10px",
                margin: "3px",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "8px",
                marginRight: "6px",
              }}
            >
              <Skeleton visible={loading}>
                <Link
                  href={{
                    pathname: "/wines/vintage/[id]",
                    query: { id: vintage.vintage },
                  }}
                >
                  <div className="truncate text-center">
                    <p className="font-sans text-sm font-bold">
                      {vintage.vintage}
                    </p>
                  </div>
                </Link>
              </Skeleton>
            </Carousel.Slide>
          );
        })}
      </Carousel>
      {!colorData && (
        <Progress
          value={scrollProgress}
          styles={{
            bar: {
              transitionDuration: "100ms",
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[1]
                  : theme.colors.gray[5],
            },
            root: {
              maxWidth: "250px",
              marginTop: "5px !important",
            },
          }}
          size="sm"
          mt="xl"
          mx="auto"
        />
      )}
    </div>
  );
}

export default CarouselWine;
