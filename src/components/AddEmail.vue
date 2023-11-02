<template>
  <q-dialog v-model="showEditEmail" @hide="newEmail = ''">
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
          <q-input name="email-input" :rules="emailRules" outlined v-model="newEmail" :dense="true" lazy-rules/>
          <q-btn class="bg-green-5 self-center " text-color="white" type="submit" label="Сохранить" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useGuestStore } from 'src/stores/guest-store';

const guestStore = useGuestStore()
const guest = ref({})
const newEmail = ref()

const showEditEmail = ref(false)

const emailRules = [value => !!value || 'Поле обязательно для заполнения',
    value => value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    || 'Введите корректный email',]

function onSubmit(evt) {
  guestStore.addGuestEmail(guest.value.id, newEmail.value)
  showEditEmail.value = false
}

const open = (newGuest) => {
  Object.assign(guest.value, newGuest)
  showEditEmail.value = true
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>