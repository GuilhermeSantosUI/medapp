import { InputFormItem } from '@/views/components/ui/input-form-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

import { Button } from '@/views/components/ui/button';
import { Form } from '@/views/components/ui/form';
import { Label } from '@/views/components/ui/label';
import { Separator } from '@/views/components/ui/separator';
import { SpinnerGap } from '@phosphor-icons/react';

const schema = z.object({
  personType: z.enum(['Pessoa Jurídica', 'Pessoa Física'], {
    required_error: 'Selecione o tipo de pessoa',
  }),
  cpf: z.string().min(11, 'O CPF deve ter 11 dígitos'),
  fullName: z.string().min(1, 'O nome completo é obrigatório'),
  rg: z.string().optional(),
  primaryPhone: z.string().min(10, 'O telefone principal é obrigatório'),
  secondaryPhone: z.string().optional(),
  email: z.string().email('Digite um e-mail válido'),
  cep: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
  street: z.string().min(1, 'O logradouro é obrigatório'),
  number: z.string().min(1, 'O número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  state: z.string().min(2, 'O estado é obrigatório'),
  ibgeCode: z.string().optional(),
});

export function Personal() {
  const form = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      personType: undefined,
      cpf: '',
      fullName: '',
      rg: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      ibgeCode: '',
    },
  });

  type FormData = z.infer<typeof schema>;

  const submit = useMutation({
    mutationFn: async (data: FormData) => {
      console.log(data);
    },
  });

  function onSubmit(values: FormData) {
    submit.mutate(values);
  }

  return (
    <div className="animate-slidein200 opacity-0">
      <div>
        <h3 className="text-lg font-medium">Dados Pessoais</h3>
        <p className="text-sm text-gray-400">
          Informe o endereço de correspondência.
        </p>
      </div>

      <Separator className="my-4" />

      <Form {...form}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label>
              Tipo de pessoa
              <span className="text-red-500">*</span>
            </Label>

            <div className="flex gap-4">
              <Button variant="outline" className="w-full rounded-xl">
                Pessoa Física
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                Pessoa Jurídica
              </Button>
            </div>
          </div>

          <InputFormItem
            control={form.control}
            name="fullName"
            label="Nome completo"
            placeholder="Digite o nome completo"
            required
          />

          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="cpf"
                label="CPF"
                placeholder="Digite o CPF"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="rg"
                label="Registro Geral"
                placeholder="Digite o RG (opcional)"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="primaryPhone"
                label="Telefone principal"
                placeholder="Digite o telefone principal"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="secondaryPhone"
                label="Telefone auxiliar"
                placeholder="Digite o telefone auxiliar (opcional)"
              />
            </div>
          </div>

          <InputFormItem
            control={form.control}
            name="email"
            label="E-mail"
            placeholder="Digite o e-mail"
            required
          />

          <div className="pb-4 border-b">
            <h3 className="text-base font-medium">Endereço</h3>
            <p className="text-sm text-gray-400">
              Informe o endereço de correspondência.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="cep"
                label="CEP"
                placeholder="Digite o CEP"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="street"
                label="Logradouro"
                placeholder="Digite o logradouro"
                required
              />
            </div>
          </div>

          <InputFormItem
            control={form.control}
            name="number"
            label="Número"
            placeholder="Digite o número"
            required
          />

          <InputFormItem
            control={form.control}
            name="complement"
            label="Complemento"
            placeholder="Digite o complemento (opcional)"
          />

          <InputFormItem
            control={form.control}
            name="neighborhood"
            label="Bairro"
            placeholder="Digite o bairro"
            required
          />

          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="city"
                label="Cidade"
                placeholder="Digite a cidade"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <InputFormItem
                control={form.control}
                name="state"
                label="Estado"
                placeholder="Digite o estado"
                required
              />
            </div>
          </div>

          <InputFormItem
            control={form.control}
            name="ibgeCode"
            label="Código IBGE"
            placeholder="Digite o código IBGE (opcional)"
          />

          <div className="py-4 gap-2">
            <Button className="flex items-center gap-2">
              Enviar atualizações
              {submit.isPending && (
                <SpinnerGap className="w-4 h-4 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
