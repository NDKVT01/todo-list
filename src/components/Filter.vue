<script setup>
import "../assets/styles/Filter.css"
import { useListStore } from '@/stores/list.store.js'
const store = useListStore()
</script>

<template>
  <div class="filter">
    <div class="filter__search">
      <img class="filter__search-icon" src="../assets/img/search.svg">
      <input class="filter__search-input" type="text" placeholder="Поиск Имени, статуса или даты" v-model="store.searchQuery">
    </div>
    <div class="filter__controls">
      <span class="filter__label">Сортировать по:</span>
      <button class="filter__sort-button" @click="store.changeFilter()">
        {{ store.columns[Math.abs(store.selectedFilter)] }}
      </button>
      <button class="filter__direction-button" @click="store.changeFilterDirection()">
        <img class="filter__direction-icon" :class="{'filter__direction-icon--desc': store.selectedFilter < 0}" src="../assets/img/menu.svg">
      </button>
    </div>
  </div>
</template>

