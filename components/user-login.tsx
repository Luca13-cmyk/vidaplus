"use client"; // client component em Next.js

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Esquema de validação do formulário usando Zod
const UserFormValidation = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const Login = () => {
  // Hook do Next.js para navegação
  const router = useRouter();
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Define o esquema de validação do formulário
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    // Começa o carregamento
    setIsLoading(true);

    try {
      // Cria um objeto de usuário com os dados do formulário
      const user = {
        email: values.email,
        password: values.password,
      };

      // Aqui poderia adicionar a lógica de autenticação, como uma chamada à API

      // Processo de login fictício
      // const userData = await userLogin(user);

      // autenticação de teste, seria removido em produção:
      if (user.email === "seu@email.com" && user.password === "vidaplus25") {
        router.push("dashboard/patient");
      } else if (
        user.email === "admin@email.com" &&
        user.password === "vidaplus25"
      ) {
        router.push("/dashboard/admin");
      } else if (
        user.email === "doctor@email.com" &&
        user.password === "vidaplus25"
      ) {
        router.push("dashboard/doctor");
      }

      // Captura erros de autenticação
    } catch (error) {
      console.log(error);
    }
    // Termina o carregamento
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 m-4 bg-gray-50 p-6 border rounded-lg shadow-sm"
      >
        <section className="mb-12 space-y-4">
          <h1 className="text-[32px] leading-[36px] font-bold md:text-[36px] md:leading-[40px] md:font-bold">
            Olá 👋
          </h1>
          <p className="font-semibold">Faça login para continuar</p>
        </section>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-14-medium text-dark-700">
                Email
              </FormLabel>

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
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-14-medium text-dark-700">
                Senha
              </FormLabel>

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

        <Button variant={"outline"} type="submit" className="cursor-pointer">
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default Login;
