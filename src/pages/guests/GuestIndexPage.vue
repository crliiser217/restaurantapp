<template>
  <q-page class="flex flex-center">
    <q-card class="form-card">
      <RegistrationForm />
    </q-card>
  </q-page>
</template>

<script setup>
import RegistrationForm from 'src/components/RegistrationForm.vue';

</script>

<style scoped lang="scss">
.form-card {
  width: 400px;
  padding: 40px;
  border-radius: 16px;
}
</style>