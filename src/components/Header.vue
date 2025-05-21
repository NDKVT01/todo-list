<script setup>
import "../assets/styles/Header.css"
import { useListStore } from '@/stores/list.store.js'
const store = useListStore()
</script>

<template>
  <div class="header">
    <h1 class="header__title">{{ store.title }}</h1>
    <button class="header__button" @click="store.showModal = !store.showModal">
      <img class="header__icon" src="../assets/img/plus.svg" alt="Add task">
    </button>
  </div>
</template>