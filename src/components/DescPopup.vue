<template>
  <q-dialog v-model="showDesc" @hide="reset()">
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
        <q-btn @click="showEditDesc=true" class="bg-green-5 self-center" text-color="white" label="Редактировать"/>
      </q-card-section>
      <q-card-section v-else class="q-pt-none">
        <q-form @submit="onSubmit" class="column" style="gap: 10px;">
          <q-input name="desc-input" :rules="[value => !!value || 'Поле обязательно для заполнения',]" outlined v-model="newDesc" :dense="true"
            type="textarea" lazy-rules />
          <q-btn class="bg-green-5 self-center " text-color="white" type="submit" label="Сохранить" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from 'src/stores/menu-store';

const menuStore = useMenuStore()
const dish = ref({})
const newDesc = ref()

const showDesc = ref(false)
const showEditDesc = ref(false)

function onSubmit() {
  menuStore.changeDishDesc(dish.value.dish_id, newDesc.value)
  showDesc.value = false
}

function reset() {
  showEditDesc.value = false
  newDesc.value = ''
}

const open = (newDish) => {
  Object.assign(dish.value, newDish)
  showDesc.value = true
  newDesc.value = dish.value.dish_description
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>