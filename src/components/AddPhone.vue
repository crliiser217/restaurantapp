<template>
  <q-dialog v-model="showEditPhone" @hide="newPhone = ''">
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
          <q-input name="phone-input" :rules="phoneRules" outlined v-model="newPhone" :dense="true" mask="+# (###) ### - ## - ##" lazy-rules/>
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
const newPhone = ref()

const showEditPhone = ref(false)

const phoneRules = [value => !!value || 'Поле обязательно для заполнения', value => value.length === 22 || 'Введите корректный номер']

function onSubmit() {
  guestStore.addGuestPhone(guest.value.id, newPhone.value)
  showEditPhone.value = false
}

const open = (newGuest) => {
  Object.assign(guest.value, newGuest)
  showEditPhone.value = true
}

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>