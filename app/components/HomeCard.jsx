"use client";
import { IconCirclePlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeCard = ({ icon, header, length, destination }) => {
  const router = useRouter();

  return (
    <div
      className="p-5 w-full flex gap-3 hover:opacity-80 transition-all cursor-pointer"
      onClick={() => {
        router.push(destination);
      }}
    >
      <div className="w-[80px]">{icon}</div>
      <div className="flex flex-col justify-center">
        <p className="font-medium text-lg">Data {header}</p>
        <p>{length}</p>
      </div>
      <div className="ml-auto mr-0 my-auto w-[40px]">
        <IconCirclePlus height={"100%"} width={"100%"} />
      </div>
    </div>
  );
};

export default HomeCard;
