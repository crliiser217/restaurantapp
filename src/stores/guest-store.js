import { defineStore } from 'pinia';
import { ref, } from 'vue'
import { useWsStore } from './useWsStore';
import { Notify } from 'quasar';

export const useGuestStore = defineStore('guest', () => {
  const guests = ref([])
  const wsStore = useWsStore()

  function getGuests() {
    let msg = {
      operation: "guests_list",
      key: "wSEYY3tA9BpRNhkwfOmS",
    }
    wsStore.sendMessage(msg)

  }

  function guestRegistration(guest) {
    guests.value.push(guest)
    guest.operation = "guest_regestration"
    guest.key = "wSEYY3tA9BpRNhkwfOmS"
    wsStore.sendMessage(guest)
    Notify.create({
      message: 'Пользователь зарегистрирован',
      color: 'green',
    })

  }

  function addGuestPhone(id, phone) {
    let msg = {
      operation: "add_guestphone",
      key: "wSEYY3tA9BpRNhkwfOmS",
      id: +id,
      phone: phone,
    }
    wsStore.sendMessage(msg)
    let index = guests.value.findIndex((elem) => elem.id === id)
    guests.value[index].phones.push(phone)
    Notify.create({
      message: 'Телефон добавлен',
      color: 'green',
    })
  }

  function addGuestEmail(id, email) {
    let msg = {
      operation: "add_guestemail",
      key: "wSEYY3tA9BpRNhkwfOmS",
      id: +id,
      email: email,
    }
    wsStore.sendMessage(msg)
    let index = guests.value.findIndex((elem) => elem.id === id)
    guests.value[index].emails.push(email)
    Notify.create({
      message: 'E-mail добавлен',
      color: 'green',
    })
  }



  return {
    guests,
    guestRegistration,
    addGuestEmail,
    addGuestPhone,
    getGuests,
  }
});