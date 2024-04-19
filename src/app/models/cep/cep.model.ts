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
  number: number;
  street: string;
  complement?: string;
}

export interface IAdressFormData {
  cep: string;
  localidade: string;
  complemento: string;
  numero: string;
  bairro: string;
  uf: string;
  logradouro: string;
}
