<template>
  <q-layout view="lhh lpr lhf" class="bg-color" >
    <q-header class="bg-grad mobile-padding" elevated>
      <q-toolbar class="mobile-toolbar q-py-md">
        <DropdownLinks :links="[{name: 'Меню блюд', link: ''}, {name: 'Гости', link: 'guests'}]" />

        <q-toolbar-title class="text-h3 text-center title">
          Гости
        </q-toolbar-title>

      </q-toolbar>
      <div class="row flex-center q-py-md q-gutter-y-md q-gutter-x-xl" >
        <q-btn class="w-full" to="/guests" color="primary" text-color="white" label="Регистрация"
                :class="route.path === '/guests' ? 'text-light-green-5' : ''"/>
        <q-btn class="w-full" to="/guests/list" color="primary" text-color="white" label="Таблица гостей" 
                :class="route.path === '/guests/list' ? 'text-light-green-5' : ''"/>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DropdownLinks from 'src/components/DropdownLinks.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style scoped lang="scss">
.bg-color {
  background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)
}
</style>