import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWsStore = defineStore('ws', () => {
  const ws = new WebSocket('ws:178.250.156.182:8080/fortest')
  const queue = ref([])
  const messages = ref({})

  ws.onmessage = function(event) {
    let message = JSON.parse(event.data)
    messages.value[message.operation] = message
  }

  function sendMessage(message) {
    message.key = "wSEYY3tA9BpRNhkwfOmS"
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
    messages,
  }
  
})