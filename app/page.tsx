import Login from "@/components/user-login";
import { LucideHospital } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
          <LucideHospital className="mb-12 h-24 w-fit self-center text-red-400" />
          <Login />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end m-2 font-semibold xl:text-left">
              © 2025 VidaPlus
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/DoctorImage.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
