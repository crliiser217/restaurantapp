<template>
  <q-page class="flex flex-center" style="padding: 100px 0;">
    <div class="grid-container">
      <DishCard v-for="dish in dishesList"
                      :card="dish" 
                      :key="dish.dish_name"
                      @edit-cost="editCost.open(dish)"
                      @show-desc="descPopup.open(dish)"/>
    </div>
    <EditCost ref="editCost" />
    <DescPopup ref="descPopup" />
    <q-inner-loading
        :showing="!dishesList"
        label="Пожалуйста подождите..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import DishCard from 'src/components/DishCard.vue'
import { useMenuStore } from 'src/stores/menu-store'
import EditCost from 'src/components/EditCost.vue'
import DescPopup from 'src/components/DescPopup.vue'

const menuStore = useMenuStore()

const dishesList = computed(() => menuStore.menu)

const editCost = ref(null)
const descPopup = ref(null)

</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 868px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
