<template>
  <div class="column justify-between text-body1 cell">
    <div class="column q-gutter-y-sm props-container">
      <div class="text-center text-weight-bold " v-if="props.guest.surname && props.guest.forename && props.guest.middlename">
        {{ `${props.guest.surname} ${props.guest.forename[0]}. ${props.guest.middlename[0]}` }}
      </div>
      <div v-else>
        ФИО
      </div>
      <div v-if="!!props.guest.phones && !!props.guest.phones.length" class="cols-2">
        <div v-for="phone in props.guest.phones" :key="phone">
           {{ phone }}
        </div>
      </div>
      <div v-else>
        Телефон
      </div>
      <div v-if="!!props.guest.emails && !!props.guest.emails.length" class="cols-2">
        <div v-for="email in props.guest.emails" :key="email">
           {{ email }}
        </div>
      </div>
      <div v-else>
        Email
      </div>
      <div v-if="props.guest.birthday">
        {{ props.guest.birthday }}
      </div>
      <div v-else>
        Дата рождения
      </div>
      <div v-if="props.guest.address">
        {{ props.guest.address }}
      </div>
      <div v-else>
        Адрес
      </div>
    </div>
    <div class="row q-pt-md" style="gap: 10px;">
      <q-btn @click="$emit('add-phone')" label="Добавить телефон" class="w-full" />
      <q-btn @click="$emit('add-email')" label="Добавить e-mail" class="w-full" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  guest: Object,
})
</script>

<style scoped lang="scss">
.cell {
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
}

.cols-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.props-container > div {
    border-bottom: 1px solid #C0C0C0;
  }

</style>