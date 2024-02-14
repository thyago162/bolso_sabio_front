import type { ModeloInvestimento } from "./ModeloInvestimentoModel"

export interface TipoInvestimento {
    id: number,
    nome: string,
    modelo_investimento: ModeloInvestimento
}