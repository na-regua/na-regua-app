export interface ICepApiData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface IAdress {
  cep: string;
  city: string;
  uf: string;
  neighborhood: string;
  number: string;
  street: string;
  complement?: string;
}
