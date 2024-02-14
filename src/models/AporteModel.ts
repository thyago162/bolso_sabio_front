import type { Investimento } from "./InvestimentoModel";
import type { User } from "./UserModel";

export interface Aporte {
    id: number,
    valor: number,
    investimento: Investimento,
    mes: number,
    ano: number,
    user: User
}