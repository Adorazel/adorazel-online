import localforage from "localforage/src/localforage.js"

const BD_NAME = "Adorazel Online"

const useStorage = () => {
  const createInstance = storeName => localforage.createInstance({name: BD_NAME, storeName})
  const dropInstance = storeName => localforage.dropInstance({name: BD_NAME, storeName})
  return {createInstance, dropInstance}
}

export default useStorage