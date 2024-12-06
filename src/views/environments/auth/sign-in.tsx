import { Button } from '@/views/components/ui/button';
import { Form } from '@/views/components/ui/form';
import { InputFormItem } from '@/views/components/ui/input-form-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Eye, EyeSlash, SpinnerGap } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

const schema = z.object({
  login: z
    .string({
      required_error: 'Esse campo não pode ser nulo.',
    })
    .min(1, { message: 'Insira valores nesse campo.' })
    .refine((cpf: string) => {
      if (typeof cpf !== 'string') return false;

      cpf = cpf.replace(/[^\d]+/g, '');

      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

      const cpfDigits = cpf.split('').map((el) => +el);

      function handleRest(count: number): number {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((sum, el, index) => sum + el * (count - index), 0) *
            10) %
            11) %
          10
        );
      }

      return (
        handleRest(10) === cpfDigits[9] && handleRest(11) === cpfDigits[10]
      );
    }, 'Digite um CPF válido.'),
  password: z
    .string({
      required_error: 'Este campo não pode ser vazio.',
    })
    .min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
});

export function SignIn() {
  const [passwordType, setPasswordType] = useState(true);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {},
  });

  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen">
      <div className="container relative flex flex-col items-center justify-center gap-8 lg:w-2/5">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center gap-20">
            <div className="flex flex-col ">
              <img src="/grupo-ssma.png" className="w-44" />
            </div>

            <Form {...form}>
              <form
                className="flex flex-col gap-4 my-4 border-slate-400"
                onSubmit={form.handleSubmit(onSubmit)}>
                <InputFormItem
                  control={form.control}
                  name="login"
                  label="CPF/CNPJ"
                  type="text"
                  className="h-fit px-4 py-2 text-base"
                  tabIndex={1}
                  placeholder="000.###.###-00"
                  required
                />

                <InputFormItem
                  control={form.control}
                  name="password"
                  label="Senha"
                  className="align-sub"
                  placeholder="********"
                  description="Informe uma senha de 8 caracteres ou mais para acessar o sistema."
                  type={passwordType ? 'password' : 'text'}
                  children={
                    <Link
                      to="/forgot-password"
                      className="text-xs text-slate-400 hover:underline">
                      Esqueceu a senha?
                    </Link>
                  }
                  actions={
                    <button
                      type="button"
                      className="absolute right-4 top-2.5"
                      onClick={() => setPasswordType((prev) => !prev)}>
                      {passwordType ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  }
                  required></InputFormItem>

                <Button
                  type="submit"
                  className="w-full rounded-xl flex items-center justify-between gap-1 sm:!h-11">
                  Entrar com CPF
                  {isPending ? (
                    <SpinnerGap className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowUpRight />
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <p className="p-0 sm:p-4 text-xs text-center text-black/50 text-balance">
            Ao continuar, você concorda com os{' '}
            <a className="underline" href="/policies/terms">
              Termos de Serviço
            </a>{' '}
            e a{' '}
            <a className="underline" href="/policies/privacy">
              Política de Privacidade
            </a>
            , e receber emails periódicos com atualizações.
          </p>
        </div>
      </div>

      <div
        className="shrink-0 w-[1px] hidden -mt-16"
        data-orientation="vertical"
        role="none"
      />
      <div className="items-center justify-center flex-col hidden w-3/5 lg:flex">
        <div className="h-4 w-[60%]  bg-[#ECDACB] rounded-t-xl blur-md" />
        <div className="h-8 w-[80%] backdrop-blur-sm bg-[#ECDACB] rounded-t-xl blur-sm" />
        <img src="/bg-image-auth.png" alt="" className="container" />
      </div>
    </div>
  );
}
