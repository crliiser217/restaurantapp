<template>
  <q-dialog v-model="showEditCost">
    <q-card class="text-subtitle1" style="width: 400px;">
      <q-card-section class="q-pb-none text-weight-bold text-h6 text-center" style="position: relative;">
        <div style="padding-top: 15px;">{{ dish.dish_name }}</div>
        <q-btn class="icon-style" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pb-none">
        Введите новую цену
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="column">
          <q-input name="cost-input" :rules="costRules" outlined v-model="dish.dish_cost" :dense="true" />
          <q-btn class="bg-green-5 self-center" text-color="white" type="submit" label="Сохранить" :loading="loader"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWsStore } from 'src/stores/useWsStore'
import { Notify } from 'quasar';

const wsStore = useWsStore()
const dish = ref({
  dish_cost: '',
})

const showEditCost = ref(false)
const loader = ref(false)

const costRules = [value => !!value || 'Поле обязательно для заполнения',
value => !!(+value) || 'Поле должно быть числом',
value => +value > 0 || 'Число должно быть положительным']

function onSubmit() {
  loader.value = true
  wsStore.sendMessage({
    operation: "change_dish_cost",
    id: dish.value.dish_id,
    cost_value: +dish.value.dish_cost
  })
}

watch(() => wsStore.messages.change_dish_cost,
  () => {
    if (wsStore.messages.change_dish_cost.status) {
      let index = wsStore.messages.dishes_list.dishes_list.findIndex((el) => el.dish_id === dish.value.dish_id)
      wsStore.messages.dishes_list.dishes_list[index].dish_cost = +dish.value.dish_cost
      loader.value = false
      showEditCost.value = false
      Notify.create({
        message: 'Цена успешно изменена',
        color: 'green',
      })
    } else {
      Notify.create({
        message: 'Произошла ошибка',
        color: 'red',
      })
    }
  })

const open = (newDish) => {
  Object.assign(dish.value, newDish)
  showEditCost.value = true

}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>