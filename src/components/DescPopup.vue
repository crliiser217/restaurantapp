<template>
  <q-dialog v-model="showDesc" @hide="showEditDesc = false">
    <q-card class="text-subtitle1" style="width: 500px;">
      <q-card-section class="q-pb-none text-weight-bold text-h6 text-center" style="position: relative;">
        <div>
          Описание
        </div>
        <q-btn class="icon-style" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-py-md">
        {{ dish.dish_name }}
      </q-card-section>
      <q-card-section v-if="!showEditDesc" class="column q-gutter-md">
        <div>{{ dish.dish_description }}</div>
        <q-btn @click="showEditDesc = true" class="bg-green-5 self-center" text-color="white" label="Редактировать" />
      </q-card-section>
      <q-card-section v-else class="q-pt-none">
        <q-form @submit="onSubmit" class="column" style="gap: 10px;">
          <q-input name="desc-input" :rules="[value => !!value || 'Поле обязательно для заполнения',]" outlined
            v-model="dish.dish_description" :dense="true" type="textarea" lazy-rules />
          <q-btn class="bg-green-5 self-center " text-color="white" type="submit" label="Сохранить" :loading="loader" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWsStore } from 'src/stores/useWsStore';
import { Notify } from 'quasar';

const wsStore = useWsStore()
const dish = ref({
  dish_description: ''
})

const showDesc = ref(false)
const showEditDesc = ref(false)
const loader = ref(false)

function onSubmit() {
  loader.value = true
  wsStore.sendMessage({
    operation: "change_dish_desc",
    id: dish.value.dish_id,
    desc_value: dish.value.dish_description
  })
}

watch(() => wsStore.messages.change_dish_desc,
  () => {
    if (wsStore.messages.change_dish_desc.status) {
      let index = wsStore.messages.dishes_list.dishes_list.findIndex((el) => el.dish_id === dish.value.dish_id)
      wsStore.messages.dishes_list.dishes_list[index].dish_description = dish.value.dish_description
      loader.value = false
      showEditDesc.value = false
      Notify.create({
        message: 'Описание успешно изменена',
        color: 'green',
      })
    } else {
      Notify.create({
        message: 'Произошла ошибка',
        color: 'red',
      })
    }
  }
)



const open = (newDish) => {
  Object.assign(dish.value, newDish)
  showDesc.value = true
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>