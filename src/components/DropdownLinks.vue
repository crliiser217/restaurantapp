<template>
  <div class=" w-full">
    <q-btn-dropdown color="primary" label="Меню" class="w-full">
      <q-list>
        <q-item v-for="elem in links" clickable v-close-popup :to="`/${elem.link}`" :key="elem.link">
          <q-item-section>
            <q-item-label>{{ elem.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>

const props = defineProps({
  links: Array,
})

</script>