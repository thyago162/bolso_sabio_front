import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = storeToRefs(useAuthStore())
const token = sessionStorage.getItem('token')
const api = axios.create({
  baseURL: 'http://localhost:8000/'
})

export async function get(url: string, params: object) {
  return await api.get(url, {
    params: params,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
}

export async function create(url: string, payload: any) {
  return await api.post(url, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
  })
}

export async function show(url: string, id: number) {
  return await api.get(url + '/' + id, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
}

export async function update(url: string, id: number, payload: any) {
  return await api.put(url + '/' + id, payload, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
}

export async function destroy(url: string, id: number) {
  return await api.delete(url + '/' + id, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
}

export async function cadastrar(url: string, payload: any) {
  return await api.post(url, payload)
}

export async function login(url: string, payload: any) {
  return await api.post(url, payload)
}

export async function ativo(ativo: string) {
  return await api.get('api/investimentos/buscar-info-ativo', {
    params: {
      nome_ativo: ativo.toLowerCase()
    },
    headers: {
        Authorization: `Bearer ${token}`
    }
  })
}
