import { Button } from '@/views/components/ui/button';
import { Form } from '@/views/components/ui/form';
import { InputFormItem } from '@/views/components/ui/input-form-item';
import { InputOTPFormItem } from '@/views/components/ui/input-otp-form-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, SpinnerGap } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
  login: z
    .string({
      required_error: 'Esse campo não pode ser nulo.',
    })
    .email('Insira um e-mail válido.'),
  otp: z.string({
    required_error: 'Esse campo não pode ser nulo.',
  }),
});

const DEFAULT_OTP = '123456';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isPending, setPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      otp: '',
    },
  });

  const onSubmit = async (data: any) => {
    if (step === 'email') {
      setPending(true);

      setTimeout(() => {
        setPending(false);
        toast.success('E-mail enviado com sucesso. Insira o código OTP.');
        setStep('otp');
      }, 2000);
    } else if (step === 'otp') {
      if (data.otp !== DEFAULT_OTP) {
        toast.error('Código OTP incorreto. Tente novamente.');
      } else {
        toast.success('Código OTP válido. Redirecionando...');
        navigate('/reset-password');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="container relative flex flex-col items-center justify-center gap-8 lg:w-2/5">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center gap-20">
            <img
              src="/grupo-ssma.png"
              className="animate-slidein200 opacity-0 w-44"
            />

            <Form {...form}>
              <form
                className="animate-slidein400 opacity-0 flex flex-col gap-4 my-4 border-slate-400"
                onSubmit={form.handleSubmit(onSubmit)}>
                {step === 'email' && (
                  <InputFormItem
                    control={form.control}
                    name="login"
                    label="E-mail"
                    type="email"
                    className="h-fit px-4 py-2 text-base"
                    tabIndex={1}
                    placeholder="Digite o seu e-mail"
                    description="Insira o e-mail cadastrado para receber o código de verificação."
                    required
                  />
                )}

                {step === 'otp' && (
                  <InputOTPFormItem
                    control={form.control}
                    className="animate-slidein400 opacity-0"
                    name="otp"
                    label="Insira o código de verificação"
                    description="Enviamos um código de verificação para o seu e-mail. Insira o código para continuar."
                    required
                  />
                )}

                <Button
                  type="submit"
                  className="w-full rounded-xl flex items-center justify-between gap-1 sm:!h-11"
                  disabled={isPending}>
                  {step === 'email' ? 'Enviar E-mail' : 'Verificar Código'}
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

        <div className="animate-slidein600 opacity-0 flex items-center justify-center">
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

      <div className="animate-slidein600 opacity-0 items-center justify-center flex-col hidden w-3/5 lg:flex">
        <div className="h-4 w-[60%] bg-[#ECDACB] rounded-t-xl blur-md" />
        <div className="h-8 w-[80%] backdrop-blur-sm bg-[#ECDACB] rounded-t-xl blur-sm" />
        <img src="/bg-image-auth.png" alt="" className="container" />
      </div>
    </div>
  );
}
