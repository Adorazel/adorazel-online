import {useCallback, useContext, useState} from "react"
import StorageContext from "../context/StorageContext"
import {GET_FILE_ALL} from "../api";
import useHttp from "./http.hook";

const useGallery = () => {
  const cache = useContext(StorageContext).images
  const [gallery, setGallery] = useState(null)
  const {request} = useHttp()

  const getGallery = useCallback((arr, path = false) => {

    const getBlob = (id, data) => {
      return cache.getItem(id).then(blob => {
        if (blob && !path) return URL.createObjectURL(blob)
        return new Promise((resolve, reject) => {
          return data.some(item => {
            if (path) return resolve(item.path)
            if (item._id === id) {
              fetch(item.path).then(response => response.blob()).then(blob => {
                const isImage = blob.type.split("/")[0] === "image"
                if (isImage) {
                  cache.setItem(id, blob).catch(error => reject(error))
                  resolve(URL.createObjectURL(blob))
                }
              }).catch(error => reject(error))
              return true
            }
            return false
          })

        })
      })
    }

    const getData = (arr, data) => {
      return Promise.all(arr.map(async images => {
        return Promise.all(images.map(async image => {
          return await getBlob(image, data)
        }))
      }))
    }

    request(...GET_FILE_ALL({id: arr.join(",").split(",")}))
      .then(data => getData(arr, data)
        .then(data => setGallery(data)))


  }, [cache, request])

  return {gallery, getGallery}
}

export default useGallery