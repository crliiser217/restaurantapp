import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMenuStore } from './menu-store'
import { useGuestStore } from './guest-store'

export const useWsStore = defineStore('ws', () => {
  const menuStore = useMenuStore()
  const guestStore = useGuestStore()
  const ws = new WebSocket('ws:178.250.156.182:8080/fortest')
  const queue = ref([])

  ws.onopen = () => {
    menuStore.getMenu()
    setTimeout(() => guestStore.getGuests(), 300)
   
  }

  ws.onmessage = function(event) {
    let dataList = JSON.parse(event.data)
    if (dataList.dishes_list) {
      menuStore.menu = dataList.dishes_list
    } else if(dataList.guest_list) {
      guestStore.guests = dataList.guest_list
    }
  }

  function sendMessage(message) {
    if(ws.readyState !== 1) {
      queue.value.push(message)
      return
    }
    ws.send(JSON.stringify(message))
  }

  ws.addEventListener('open', () => {
    queue.value.forEach(message => sendMessage(message))
    queue.value = []
  })

  return {
    sendMessage,
  }
  
})