<template>
  <q-page class="column flex-center" style="padding: 100px 0;">
    <div class="table-container" v-if="wsStore.messages.guests_list">
      <div class="text-h3 table-header">Таблица гостей</div>
      <div class="grid-container" >
        <GuestCell v-for="guest in wsStore.messages.guests_list.guest_list" :guest="guest" :key="guest.id" @add-phone="addPhone.open(guest)"
                    @add-email="addEmail.open(guest)"/>
        <div v-for="n in wsStore.messages.guests_list.guest_list.length % 3 + 1" style="background-color: white;" :key="n"></div>
      </div>
    </div>
    <q-inner-loading
        v-else
        showing
        label="Пожалуйста подождите..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    <AddPhone ref="addPhone" />
    <AddEmail ref="addEmail" />
    
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWsStore } from 'src/stores/useWsStore'
import GuestCell from 'src/components/GuestCell.vue'
import AddPhone from 'src/components/AddPhone.vue'
import AddEmail from 'src/components/AddEmail.vue'

const wsStore = useWsStore()
onMounted(() => wsStore.sendMessage({
  operation: "guests_list",
}))

const addPhone = ref(null)
const addEmail = ref(null)

</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); 
  border: 1px solid #C0C0C0;
  grid-gap: 1px;
  box-sizing: border-box;
  background-color: #C0C0C0;
  @media (max-width: 1240px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.table-header {
  border: 1px #C0C0C0;
  border-style: solid solid none solid;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px 10px 0 0;
}

.table-container {
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  @media (max-width: 639px) {
    padding: 10px;
  }
}
</style>