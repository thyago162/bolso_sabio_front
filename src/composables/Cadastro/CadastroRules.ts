export const nomeCompletoRules = [
    (value: any) => {
        return value ? true : 'Nome é obrigatório'
    },

    (value: any) => {
        return (value?.length >= 10 && value?.length < 255) ? true : 'Nome deve ter mais de 15 caracteres e menos de 255'
    },

    (value: any) => {
        return value.indexOf(' ') >= 0 ? true : 'Nome deve conter pelo menos um sobrenome'
    }
]
export const emailRules = [
    (value: any) => {
        return value ? true : 'Email é obrigatório'
    },

    (value: any) => {
        return value.indexOf('@') >= 0 ? true : 'Email possuí formato inválido'
    },

    (value: any) => {
        return  value?.length < 255 ? true : 'Email não deve ter mais do que 255 caracteres'
    }
]

export const cpfRules = [
    (value: any) => {
        return value ? true : 'Cpf é obrigatório'
    },

    (value: any) => {
        return value?.length == 14 ? true : 'Cpf inválido'
    }
]

export const dddRules = [
    (value: any) => {
        return value ? true : 'Ddd é obrigatório'
    },

    (value: any) => {
        return value?.length == 2 ? true : 'Ddd inválido'
    }
]

export const telefoneRules = [
    (value: any) => {
        return value ? true : 'Telefone é obrigatório'
    },

    (value: any) => {
        return value?.length == 10 ? true : 'Telefone com formato inválido'
    }
]

export const passwordRules = [
    (value: any) => {
        return value ? true : 'Senha é obrigatória'
    },

    (value: any) => {
        return value?.length > 8 ? true : 'A senha deve ter pelo menos 8 caracteres'
    },

    (value: any) => {
        const regex = /\W|_/
        return regex.test(value) ? true : 'A senha deve conter pelo menos 1 caractere especial'
    }
]