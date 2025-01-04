export type AuthProps = {
  cpf_cnpj: string;
  password: string;
};

export type ForgotPasswordProps = {
  cpf_cnpj: string;
  email: string;
};

export type AuthResponseProps = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  api_token: string;
};
