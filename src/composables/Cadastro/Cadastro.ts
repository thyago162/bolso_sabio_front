import {useAuthStore} from '@/stores/auth'
import {cadastrar} from '@/services/api'

const auth = useAuthStore()

export async function realizarCadastro(form: any) {
  const payload = {
    nome_completo: form.nome_completo.value,
    cpf: form.cpf.value,
    email: form.email.value,
    ddd: form.ddd.value,
    telefone: form.telefone.value,
    password: form.password.value,
    password_confirmed: form.password_confirmed.value
  }
  cadastrar('', payload).then(res => {

  }).catch(err => {
    
  })
}