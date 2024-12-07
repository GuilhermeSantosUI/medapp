import { api } from '..';

type AuthProps = {
  cpf_cnpj: string;
  password: string;
};

type ResponseProps = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  api_token: string;
};

export async function auth(params: AuthProps): Promise<ResponseProps | null> {
  const controller = new AbortController();
  const { signal } = controller;

  const queryString = new URLSearchParams(
    params as Record<string, string>,
  ).toString();

  const url = `/auth?${queryString}`;

  const { data } = await api.post<ResponseProps>(url, { signal });

  return data;
}
