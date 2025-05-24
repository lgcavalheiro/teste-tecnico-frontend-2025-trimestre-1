export interface CEPResponse {
  cep: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  estado?: string;
  regiao?: string;
  unidade?: string;
  erro?: boolean;
}
