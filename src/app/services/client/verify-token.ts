import { api } from '..';

type VerifyTokenResponse = {
  id: number;
  user_id: number;
  branch_id: number;
  type: string;
  name: string;
  name_fantasy: string;
  cpf_cnpj: string;
  rg_ie: string;
  legal_nature: string | null;
  icms: string;
  iest: string | null;
  municipal_registration: string;
  phone1: string;
  phone2: string;
  email: string;
  url: string | null;
  zipCode: string;
  public_place: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  img: string | null;
  status: number;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export async function verifyToken(): Promise<VerifyTokenResponse> {
  const { signal } = new AbortController();

  const { data } = await api.get<VerifyTokenResponse>(`/verify-token`, {
    signal,
  });

  return data;
}
