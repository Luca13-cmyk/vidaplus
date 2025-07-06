"use client";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "./ui/button";
import { LucidePlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Define as propriedades do componente StatCard
type StatCardProps = {
  type: "appointments" | "patients" | "cancelled" | "medicalrecords";
  count: number;
  label: string;
  icon: string;
};

// Componente StatCard que exibe informações estatísticas
export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  const router = useRouter();
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg relative cursor-pointer hover:shadow-xl transition-all duration-300",
        {
          "bg-gray-100": type === "appointments",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={type}
          className="size-8 w-fit"
        />
        <h2 className="text-xl font-bold text-black">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
      {type === "patients" && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            // Handle the click event for adding a new patient

            router.push("/dashboard/admin/patients/new");
          }}
          variant={"link"}
          className="cursor-pointer text-green-700 absolute bottom-4 right-4 hover:text-green-800"
        >
          <LucidePlusCircle className="size-7" />
        </Button>
      )}
      {type === "appointments" && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            // Handle the click event for adding a new patient
          }}
          variant={"link"}
          className="cursor-pointer text-green-700 absolute bottom-4 right-4 hover:text-green-800"
        >
          <LucidePlusCircle className="size-7" />
        </Button>
      )}
      {type === "medicalrecords" && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            // Handle the click event for adding a new record
          }}
          variant={"link"}
          className="cursor-pointer text-green-700 absolute bottom-4 right-4 hover:text-green-800"
        >
          <LucidePlusCircle className="size-7" />
        </Button>
      )}
    </div>
  );
};
