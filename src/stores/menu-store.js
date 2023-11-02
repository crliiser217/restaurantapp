import { defineStore } from 'pinia';
import { ref, } from 'vue'
import { Notify } from 'quasar';
import { useWsStore } from './useWsStore';

export const useMenuStore = defineStore('menu', () => {
  const wsStore = useWsStore()
  const menu = ref([])

  function getMenu() {
    let msg = {
      operation: "dishes_list",
      key: "wSEYY3tA9BpRNhkwfOmS",
    }
    wsStore.sendMessage(msg)

  }

  function changeDishCost(id, cost) {
    let msg = {
      operation: "change_dish_cost",
      key: "wSEYY3tA9BpRNhkwfOmS",
      id: id,
      cost_value: +cost
    }
    wsStore.sendMessage(msg)
    let index = menu.value.findIndex((el) => el.dish_id === id)
    menu.value[index].dish_cost = +cost
    Notify.create({
      message: 'Цена успешно изменена',
      color: 'green',
    })

  }

  function changeDishDesc(id, desc) {
    let msg = {
      operation: "change_dish_desc",
      key: "wSEYY3tA9BpRNhkwfOmS",
      id: id,
      desc_value: desc
    }
    wsStore.sendMessage(msg)
    let index = menu.value.findIndex((el) => el.dish_id === id)
    menu.value[index].dish_description = desc
    Notify.create({
      message: 'Описание успешно изменено',
      color: 'green',
    })
  }

  return {
    menu,
    changeDishCost,
    changeDishDesc,
    getMenu,
  }
});
