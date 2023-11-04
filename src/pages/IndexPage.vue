<template>
  <q-page class="flex flex-center" style="padding: 100px 0;">
    <div class="grid-container" v-if="wsStore.messages.dishes_list">
      <DishCard v-for="dish in wsStore.messages.dishes_list.dishes_list"
                      :card="dish" 
                      :key="dish.dish_name"
                      @edit-cost="editCost.open(dish)"
                      @show-desc="descPopup.open(dish)"/>
    </div>
    <q-inner-loading
        v-else
        showing
        label="Пожалуйста подождите..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    <EditCost ref="editCost" />
    <DescPopup ref="descPopup" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DishCard from 'src/components/DishCard.vue'
import EditCost from 'src/components/EditCost.vue'
import DescPopup from 'src/components/DescPopup.vue'
import { useWsStore } from 'src/stores/useWsStore'

const wsStore = useWsStore()

onMounted(() => wsStore.sendMessage({operation: "dishes_list",}))

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
