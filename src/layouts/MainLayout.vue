<template>
  <q-layout view="lhh lpr lff" class="bg-img">
    <q-header class="bg-grad mobile-padding">
      <q-toolbar class="mobile-toolbar q-py-sm">
        <DropdownLinks :links="[{name: 'Меню', link: ''}, { name: 'Регистрация', link: 'guests' }]" />

        <q-toolbar-title class="text-h3 text-center q-py-sm title" >
          Меню
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DropdownLinks from 'src/components/DropdownLinks.vue'

</script>

<style scoped lang="scss">
.bg-img {
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
}
</style>
