import { StatCard } from "@/components/stat-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideArrowBigRight, LucideHospital } from "lucide-react";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

// Componente que define uma linha da tabela com os dados do paciente, status, consulta e doutor
const RowTable = ({
  className,
  patient,
  status,
  schedule,
  doctor,
}: {
  patient: string;
  className?: string;
  status: string;
  schedule: string;
  doctor: string;
}) => {
  return (
    <TableRow className={className}>
      <TableCell className="font-medium">{patient}</TableCell>
      <TableCell
        className={clsx({
          "text-green-500": status === "Agendado",
          "text-red-500": status === "Cancelado",
          "text-yellow-500": status === "Pendente",
        })}
      >
        {status}
      </TableCell>
      <TableCell>{schedule}</TableCell>
      <TableCell className="text-right">{doctor}</TableCell>
    </TableRow>
  );
};
// Página principal do dashboard do administrador
const AdminPage = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="sticky top-3 z-40 mx-3 flex items-center justify-between rounded-2xl bg-white px-[5%] py-5 shadow-lg xl:px-12">
        <LucideHospital className="h-12 w-fit  text-red-400" />
        <div className="flex justify-between items-center space-x-4">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link href="/" className="cursor-pointer flex space-x-2">
            <Button variant={"destructive"} className="cursor-pointer">
              <LucideArrowBigRight className="size-5" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">
        <section className="w-full space-y-4">
          <h1 className="text-[32px] leading-[36px] font-bold md:text-[36px] md:leading-[40px] md:font-bold">
            Admin Dashboard
          </h1>
          <p className="font-semibold">
            Comece o dia gerenciando cadastros, controlando fluxo de internações
            e lista de pacientes
          </p>
        </section>
        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={4}
            label="Consultas Hoje"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="patients"
            count={7}
            label="Pacientes"
            icon={"/assets/icons/user.svg"}
          />
          <StatCard
            type="cancelled"
            count={1}
            label="Consultas Canceladas"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <div className="z-10 w-full overflow-hidden rounded-lg shadow-lg">
          {/* Aqui poderia implementar uma tabela pegando dados do banco de dados */}

          <Table className="rounded-lg overflow-hidden">
            <TableCaption>Últimos fluxos do hospital.</TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[100px]">Paciente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Consulta</TableHead>
                <TableHead className="text-right">Doutor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <RowTable
                doctor="Dra. Fernanda"
                patient="Pedro Araujo"
                schedule="10/07/2025 às 14:00"
                status="Agendado"
              />
              <RowTable
                className="bg-gray-100"
                doctor="Dr. Carlos"
                patient="Felipe Souza"
                schedule="10/07/2025 às 15:00"
                status="Agendado"
              />
              <RowTable
                doctor="Dr. João"
                patient="Ana Clara"
                schedule="10/07/2025 às 16:00"
                status="Cancelado"
              />
              <RowTable
                className="bg-gray-100"
                doctor="Dra. Fernanda"
                patient="Mariana Lima"
                schedule="10/07/2025 às 17:00"
                status="Pendente"
              />
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
