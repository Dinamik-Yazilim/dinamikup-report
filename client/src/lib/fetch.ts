// import { getAuthToken } from './authHelper'

function prepareHeaders(token?: string) {
  return { 'Content-Type': 'application/json', token: token || '' }
}
export function getItem(path: string, token?: string) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'GET',
      headers: prepareHeaders(token)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}

export function getList(path: string, token?: string) {
  return new Promise<any>((resolve, reject) => {

    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'GET',
      headers: prepareHeaders(token)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}

export function putItem(path: string, token?: string, item?: any) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'PUT',
      headers: prepareHeaders(token),
      body: JSON.stringify(item)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}
export function postItem(path: string, token?: string, item?: any) {
  return new Promise<any>((resolve, reject) => {
    console.log('postItem url:', `${process.env.NEXT_PUBLIC_API_URI}${path}`)
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'POST',
      headers: prepareHeaders(token),
      body: JSON.stringify(item)
    })
      .then(ret => ret.json())
      .then(result => {
        console.log('postItem result:', result)
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(err => {
        console.log('postItem err:', err)
        reject(err)
      })
  })
}
export function deleteItem(path: string, token?: string) {
  return new Promise<any>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'DELETE',
      headers: prepareHeaders(token)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}

export interface SearchParamProps {
  filter?: any
  sort?: any
  select?: any
  populate?: any
  limit?: number
}
export function searchList(path: string, token?: string, searchParam?: SearchParamProps | any) {
  return new Promise<any>((resolve, reject) => {

    fetch(`${process.env.NEXT_PUBLIC_API_URI}${path}`, {
      method: 'PATCH',
      headers: prepareHeaders(token),
      body: JSON.stringify(searchParam)
    })
      .then(ret => ret.json())
      .then(result => {
        if (result.success) {
          resolve(result.data)
        } else {
          reject(result.error)
        }
      }).catch(reject)
  })
}