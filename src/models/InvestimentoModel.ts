import type {TipoInvestimento} from './TipoInvestimentoModel'
import type { User } from './UserModel'

export interface Investimento {
    id: number,
    tipo_investimento: TipoInvestimento,
    nome: string,
    valor_unitario: number,
    quantidade: number,
    valor_total: number,
    user: User
}