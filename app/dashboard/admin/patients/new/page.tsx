"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LucideArrowBigLeft, LucideHospital } from "lucide-react";

// Esquema de validação do formulário usando Zod
const UserFormValidation = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  userType: z.string(),
  number: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  gender: z.string(),
  address: z.string(),
});

const RegisterPatient = () => {
  // Hook do Next.js para navegação
  const router = useRouter();
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Define o esquema de validação do formulário
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      userType: "patient", // Definindo o tipo de usuário como paciente
      password: "",
      gender: "",
      number: "",
      name: "",
      address: "",
    },
  });

  // Função chamada ao enviar o formulário
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        email: values.email,
        userType: values.userType,
        password: values.password,
        gender: values.gender,
        name: values.name,
        number: values.number,
        address: values.address,

        // Aqui você pode adicionar outros campos necessários para o registro do paciente
      };
      console.log(user);

      // const userData = await userRegisterPatient(user); // Processo de RegisterPatient fictício

      router.push("/dashboard/admin");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px]">
          <div className="flex items-center justify-around md:justify-between mb-4">
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => router.back()}
            >
              <LucideArrowBigLeft className="size-10 text-black" />
            </Button>
            <LucideHospital className="mb-12 h-24 w-fit self-center text-red-400 sm:hidden" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-6 m-4 bg-gray-50 p-6 border rounded-lg shadow-sm lg:w-[600px] xl:w-[700px]"
            >
              <section className="mb-12 space-y-4">
                <p className="font-semibold">Registre um novo paciente</p>
              </section>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nome Completo</FormLabel>
                    <Input
                      type="text"
                      placeholder="João da Silva"
                      className="bg-gray-100 placeholder:text-dark-600  h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                      {...field}
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-100 placeholder:text-dark-600  h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                      {...field}
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1 w-24">
                    <FormLabel>Gênero</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" type="button">
                          {field.value === "man"
                            ? "Masculino"
                            : field.value === "woman"
                            ? "Feminino"
                            : "Selecione"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        <DropdownMenuLabel>
                          Escolha seu gênero
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <DropdownMenuRadioItem value="man">
                            Masculino
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="woman">
                            Feminino
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Telefone</FormLabel>
                      <Input
                        type="text"
                        placeholder="(99) 99999-9999"
                        className="bg-gray-100 placeholder:text-dark-600  h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                        {...field}
                      />
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Senha</FormLabel>
                      <Input
                        type="password"
                        placeholder="vidaplus25"
                        className="bg-gray-100 placeholder:text-dark-600  h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                        {...field}
                      />
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Endereço</FormLabel>
                    <Input
                      type="text"
                      placeholder="Endereço"
                      className="bg-gray-100 placeholder:text-dark-600  h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                      {...field}
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button variant={"outline"} className="cursor-pointer">
                Cadastrar
              </Button>
            </form>
          </Form>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end m-2 font-semibold xl:text-left">
              © 2025 VidaPlus
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/doctor-health.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
};

export default RegisterPatient;
