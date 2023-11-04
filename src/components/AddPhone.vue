<template>
  <q-dialog v-model="showEditPhone" @hide="phoneField.model = ''">
    <q-card class="text-subtitle1" style="width: 400px;">
      <q-card-section class="q-pb-none text-weight-bold text-h6 text-center" style="position: relative;">
        <div v-if="guest.surname && guest.forename && guest.middlename">
          {{ `${guest.surname} ${guest.forename[0]}. ${guest.middlename[0]}` }}
        </div>
        <div v-else>
          ФИО
        </div>
        <q-btn class="icon-style" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-py-md">
        Добавьте новый номер
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="column" style="gap: 10px;">
          <q-input outlined lazy-rules :dense="true" v-model="phoneField.model" :rules="phoneField.rules"
            :label="phoneField.label" :mask="phoneField.mask" />
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
const guest = ref({})
const phoneField = ref({
  model: '',
  rules: [value => !!value || 'Поле обязательно для заполнения', value => value.length === 22 || 'Введите корректный номер'],
  label: 'Телефон',
  mask: '+# (###) ### - ## - ##',
})

const showEditPhone = ref(false)
const loader = ref(false)

function onSubmit() {
  loader.value = true
  wsStore.sendMessage({
    operation: "add_guestphone",
    id: guest.value.id,
    phone: phoneField.value.model,
  })
}

watch(() => wsStore.messages.add_guestphone,
  () => {
    if (wsStore.messages.add_guestphone.status) {
      let index = wsStore.messages.guests_list.guest_list.findIndex((el) => el.id === guest.value.id)
      wsStore.messages.guests_list.guest_list[index].phones.push(phoneField.value.model)
      loader.value = false
      showEditPhone.value = false
      Notify.create({
        message: 'Телефон успешно добавлен',
        color: 'green',
      })
    } else {
      Notify.create({
        message: 'Произошла ошибка',
        color: 'red'
      })
    }
  }
)

const open = (newGuest) => {
  Object.assign(guest.value, newGuest)
  showEditPhone.value = true
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>