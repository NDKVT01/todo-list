<script setup>
import Header from './components/Header.vue'
import Filter from './components/Filter.vue'
import List from './components/List.vue'
import Modal from './components/Modal.vue'
import { useListStore } from '@/stores/list.store.js'
import { onMounted, onBeforeMount } from "vue";
const store = useListStore()
onMounted(() => {
  store.fetchItems()
})
onBeforeMount(() => {
  store.saveItems()
})
</script>

<template>
  <main :class="{ modal_active : store.showModal}">
    <div class="main_content">
      <Header/>
      <Filter/>
      <List/>
      <Modal/>
    </div>
  </main>
</template>