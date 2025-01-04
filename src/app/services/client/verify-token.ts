import { VerifyTokenResponse } from '@/app/models';
import { api } from '..';

export async function verifyToken(): Promise<VerifyTokenResponse> {
  const { signal } = new AbortController();

  const { data } = await api.get<VerifyTokenResponse>(`/verify-token`, {
    signal,
  });

  return data;
}
