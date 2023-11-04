<template>
  <q-dialog v-model="showEditEmail" @hide="emailField.model = ''">
    <q-card class="text-subtitle1" style="width: 400px;">
      <q-card-section class="q-pb-none text-weight-bold text-h6 text-center" style="position: relative;">
        <div v-if="guest.surname && guest.forename && guest.middlename">
          {{ `${guest.surname} ${guest.forename[0]}. ${guest.middlename[0]}` }}
        </div>
        <div v-else>
          ФИО
        </div>
        <q-space />
        <q-btn class="icon-style" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-py-md">
        Добавьте новый e-mail
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="column" style="gap: 10px;">
          <q-input outlined lazy-rules :dense="true" :label="emailField.label" :rules="emailField.rules"
            v-model="emailField.model" />
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
const emailField = ref({
  model: '',
  rules: [value => !!value || 'Поле обязательно для заполнения',
  value => value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    || 'Введите корректный email',],
  label: 'Email',
})

const showEditEmail = ref(false)
const loader = ref(false)

function onSubmit() {
  loader.value = true
  wsStore.sendMessage({
    operation: "add_guestemail",
    id: guest.value.id,
    email: emailField.value.model,
  })
}

watch(() => wsStore.messages.add_guestemail,
  () => {
    if (wsStore.messages.add_guestemail.status) {
      let index = wsStore.messages.guests_list.guest_list.findIndex((el) => el.id === guest.value.id)
      wsStore.messages.guests_list.guest_list[index].emails.push(emailField.value.model)
      loader.value = false
      showEditEmail.value = false
      Notify.create({
        message: 'Email успешно добавлен',
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
  showEditEmail.value = true
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>