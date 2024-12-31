import { api } from '..';

type ForgotPasswordProps = {
  cpf_cnpj: string;
  email: string;
};

export async function ForgotPassword(
  params: ForgotPasswordProps,
): Promise<void> {
  await api.post(`/client/forgot-password`, params);
}
