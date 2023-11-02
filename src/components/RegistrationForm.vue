<template>
  <q-form @submit="onSubmit" class="column" style="gap: 10px;">
    <q-input outlined v-model="forename" name="forename" :dense="true" placeholder="Имя" :rules="[isEmptyRule]" lazy-rules/>
    <q-input outlined v-model="surname" name="surname" :dense="true" placeholder="Фамилия" :rules="[isEmptyRule]" lazy-rules/>
    <q-input outlined v-model="middlename" name="middlename" :dense="true" placeholder="Отчество" :rules="[isEmptyRule]" lazy-rules/>
    <q-input outlined v-model="phone" name="phone" :dense="true" placeholder="Номер телефона" 
            :rules="[isEmptyRule, isPhoneRule]" mask="+# (###) ### - ## - ##" lazy-rules/>
    <q-input outlined v-model="email" name="email" :dense="true" placeholder="E-mail" :rules="[isEmptyRule, isEmailRule]"  lazy-rules/>
    <q-input outlined v-model="birthday" name="birthday" :dense="true" placeholder="Дата рождения" 
            :rules="[isEmptyRule, isBirthdayRule]" mask="##.##.####" lazy-rules/>
    <q-input outlined v-model="address" name="address" :dense="true" placeholder="Адрес" :rules="[isEmptyRule]" lazy-rules/> 
    <!-- <q-input name="male" /> -->
    <q-btn type="submit" class="bg-green-5" text-color="white" label="Сохранить" style="border-radius: 16px;"/>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useGuestStore } from 'src/stores/guest-store'

const guestStore = useGuestStore()

const forename = ref(null)
const surname = ref(null)
const middlename = ref(null)
const phone = ref(null)
const email = ref(null)
const birthday = ref(null)
const address = ref(null)

function onSubmit(evt) {
  const formData = new FormData(evt.target)
  const data = {}
  for (const [name, value] of formData.entries()) {
    data[name] = value
  }
  guestStore.guestRegistration(data)
}

const isEmptyRule = value => !!value || 'Поле обязательно для заполнения'
const isEmailRule = value => value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    || 'Введите корректный email'
const isPhoneRule = value => value.length === 22 || 'Введите корректный номер'
const currentYear = (new Date).getFullYear()
const isBirthdayRule = value => value.length === 10 && (currentYear - +value.slice(6)) > 1 && (currentYear - +value.slice(6)) < 100
      && +value.slice(0, 2) < 32 && +value.slice(3, 5) < 13 || 'Введите корректную дату'
</script>

<style scoped lang="scss"></style>