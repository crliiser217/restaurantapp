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
          <q-btn class="bg-green-5 self-center" text-color="white" type="submit" label="Сохранить"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from 'stores/menu-store'

const menuStore = useMenuStore()
const dish = ref({})

const showEditCost = ref(false)

const costRules = [value => !!value || 'Поле обязательно для заполнения',
value => !!(+value) || 'Поле должно быть числом',
value => +value > 0 || 'Число должно быть положительным']

function onSubmit(evt) {
  const formData = new FormData(evt.target)
  const data = []
  for (const [name, value] of formData.entries()) {
    data.push({
      name,
      value
    })
  }
  menuStore.changeDishCost(dish.value.dish_id, data[0].value)
  showEditCost.value = false
}

const open = (newDish) => {
  Object.assign(dish.value, newDish)
  showEditCost.value = true

}

defineExpose({
  open,
})
</script>

<style scoped lang="scss">

</style>