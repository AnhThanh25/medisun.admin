import axios from 'axios'
import { ref } from 'vue'

const ErrorType = {
    TokenInvalid: 'token_invalid',
    ResponseError: 'resp_error',
    RequestError: 'res_error'
  }

export function uploadImage(url, image) {
  const formData = new FormData()
  formData.append('image', image)
  const error = ref(null)
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const progress = ref(0)
  const data = ref({})

  const post = async () => {
    try {
      isLoading.value = true
      const response = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      })
      if (response.status != 200) {
        throw new Error('Something went wrong') // Check if the response status is not 200 and throw an error if it is not
      }
      isLoading.value = false // Set the loading state to false

      // Handle the response based on the response code
      const respData = response.data
      const code = respData.RespCode
      const message = respData.RespText

      switch (code) {
        case 0:
          isSuccess.value = true
          data.value = respData
          break
        case -1:
          error.value = {
            type: ErrorType.TokenInvalid,
            message: 'Hết hạn phiên đăng nhập. Vui lòng đăng nhập lại để tiếp tục'
          } // If the response code is -1, set the error variable to an object with a type and message property
          break
        default:
          if (code % 10 == 9) {
            error.value = {
              type: ErrorType.RequestError,
              message: 'Hệ thống đang bận, bạn vui lòng thử lại sau giây lát'
            } // If the response code ends in 9, set the error variable to an object with a type and message property
          } else {
            error.value = {
              type: ErrorType.RequestError,
              message: message
            } // Otherwise, set the error variable to an object with a type and message property
          }
          break
      }
    } catch (e) {
      error.value = {
        type: ErrorType.RequestError,
        message: 'Không thể kết nối tới máy chủ, bạn vui lòng thử lại sau giây lát.'
      } // If an error occurs, set the error variable to an object with a type and message property
      isLoading.value = false // Set the loading state to false
    }
  }
  post()
  return { error, isLoading, isSuccess, progress, data }
}
