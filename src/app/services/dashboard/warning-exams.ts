import { api } from '..';

type WarningResponse = Array<any>;

export async function warningExams(): Promise<WarningResponse> {
  const { signal } = new AbortController();

  const { data } = await api.get<WarningResponse>(`/client/warning-exams`, {
    signal,
  });

  return data;
}
