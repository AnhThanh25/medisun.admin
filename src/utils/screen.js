import { useEventListener } from "./event"
import { ref, onMounted } from "vue"

export function useScreen() {
  const md = ref(false)
  const lg = ref(false)
  const xl = ref(false)

  function handleResize(){
    md.value = window.innerWidth <= 768
    lg.value = window.innerWidth <= 992 && window.innerWidth > 768
    xl.value = window.innerWidth > 992
  }
  useEventListener(window, 'resize', event => {
    handleResize()
  })

  onMounted(() => {
    handleResize()
  })

  return { md, lg, xl }
}