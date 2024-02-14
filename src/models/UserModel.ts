import type {Endereco} from './EnderecoModel'

export interface User {
    id: number,
    nome_completo: string,
    email: string,
    cpf: string,
    cod_telefone: string,
    num_telefone: string,
    endereco: Endereco
}