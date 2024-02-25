import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333/'
})

const headers = {Authorization: `Bearer `}

export async function get(url: string, params: object) {
    return await api.get(url, {
        params: params,
        headers: headers
    })
}

export async function create(url: string, payload: any) {
    return await api.post(url, payload, {headers: headers})
}

export async function show(url: string, id: number) {
    return await api.get(url + '/' + id, {headers: headers})  
}

export async function update(url: string, id: number, payload: any) {
    return await api.put(url + '/' + id, payload, {headers: headers})
}

export async function destroy(url: string, id:number) {
    return await api.delete(url + '/' + id, {headers: headers})
}

export async function cadastrar(url: string, payload: any) {
    return await api.post(url, payload)
}

export async function login(url: string, payload: any) {
    return await api.post(url, payload)
}