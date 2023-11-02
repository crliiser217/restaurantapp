<template>
  <q-card style="width: 250px; height: 350px;" class="column">
    <q-card-section class="col-3 text-weight-bold text-center">
      {{ props.card.dish_name }}
    </q-card-section>
    <q-card-section @click="$emit('show-desc')" class="col-6 img-hover">
      <img :src="`data:image/jpeg;base64,${props.card.dish_image}`" :alt="props.card.dish_name" style="height: 100%; width: 100%;" >
    </q-card-section>
    <q-card-section class="col cost-container text-h6 text-weight-bold">
      {{ `₽${props.card.dish_cost}` }}
      <img @click="$emit('edit-cost')" src="/edit_icon.svg" alt="Редактировать" class="edit-icon">
    </q-card-section>
  </q-card>
</template>

<script setup>

const props = defineProps({
  card: Object,
})

</script>

<style scoped lang="scss">

.img-hover {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}
.cost-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-icon {
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
</style>