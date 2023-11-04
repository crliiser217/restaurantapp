<template>
  <q-form @submit="onSubmit" class="column" ref="registrationForm" style="gap: 10px;">
    <q-input v-for="field in registrationFields" outlined :dense="true" lazy-rules v-model="field.model"
      :label="field.label" :rules="field.rules" :mask="field.mask" :key="field.name" :name="field.name" />
    <q-btn type="submit" class="bg-green-5" text-color="white" label="Сохранить" style="border-radius: 16px;"
      :loading="loader" />
  </q-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWsStore } from 'src/stores/useWsStore';
import { Notify } from 'quasar';

const wsStore = useWsStore()
const registrationForm = ref(null)
const loader = ref(false)

function onSubmit() {
  loader.value = true
  const data = {}
  for (let field in registrationFields.value) {
    data[field] = registrationFields.value[field].model
  }
  data.operation = "guest_regestration"
  wsStore.sendMessage(data)
}

watch(() => wsStore.messages.guest_regestration,
  () => {
    if (wsStore.messages.guest_regestration.status) {
      wsStore.sendMessage({
        operation: "guests_list",
      })
      loader.value = false
      resetForm()
      Notify.create({
        message: 'Гость успешно зарегистрирован',
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

function resetForm() {
  for (let field in registrationFields.value) {
    registrationFields.value[field].model = ''
  }
  registrationForm.value.resetValidation()
}

const registrationFields = ref({
  forename: {
    name: 'forename',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения',],
    label: 'Имя',
    mask: '',
  },
  surname: {
    name: 'surname',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения',],
    label: 'Фамилия',
    mask: '',
  },
  middlename: {
    name: 'middlename',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения',],
    label: 'Отчество',
    mask: '',
  },
  phone: {
    name: 'phone',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения', value => value.length === 22 || 'Введите корректный номер'],
    label: 'Номер телефона',
    mask: '+# (###) ### - ## - ##',
  },
  email: {
    name: 'email',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения', value =>
      value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      || 'Введите корректный email'],
    label: 'E-mail',
    mask: '',
  },
  birthday: {
    name: 'birthday',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения', value => value.length === 10 &&
      ((new Date).getFullYear() - +value.slice(6)) > 1 && ((new Date).getFullYear() - +value.slice(6)) < 100
      && +value.slice(0, 2) < 32 && +value.slice(3, 5) < 13 || 'Введите корректную дату'],
    label: 'Дата рождения',
    mask: '##.##.####',
  },
  address: {
    name: 'address',
    model: '',
    rules: [value => !!value || 'Поле обязательно для заполнения'],
    label: 'Адрес',
    mask: '',
  },
})
</script>
<style scoped lang="scss"></style>