import storage from "@/utils/storage";
import store from "@/store";

const TokenKey = 'TOKEN'

export function getToken() {
  let token = store.getters.token
  if (token) {
    return token
  } else if (storage.get(TokenKey)) {
    store.commit("user/SET_TOKEN", storage.get(TokenKey))
    return store.getters.token
  }
}

export function setToken(token: string) {
  store.commit("user/SET_TOKEN", token)
  return storage.set(TokenKey, token)
}

export function removeToken() {
  store.commit("user/SET_TOKEN", '')
  return storage.remove(TokenKey)
}
