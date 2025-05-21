<script setup>
import "../assets/styles/Modal.css"
import { useListStore } from '@/stores/list.store.js'
const store = useListStore()
</script>

<template>
  <div class="modal" :class="{'modal--shown': store.showModal}">
    <div class="modal__window">
      <div class="modal__header">
        <h1 class="modal__title">Создать новую задачу</h1>
        <button class="modal__close-button" @click="store.showModal = !store.showModal, store.newTaskDescription = ''">
          <img class="modal__close-icon" src="../assets/img/close.svg">
        </button>
      </div>
      <div class="modal__input-group">
        <label class="modal__label">Описание</label>
        <input class="modal__input" type="text" placeholder="Введите описание" v-model="store.newTaskDescription">
      </div>
      <button class="modal__submit-button" @click="store.sendItem()">Создать</button>
    </div>
  </div>
</template>