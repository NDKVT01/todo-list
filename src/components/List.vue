<script setup>
import { useListStore } from '@/stores/list.store.js'
import { format } from "date-fns"
import "../assets/styles/List.css"
const store = useListStore()
</script>

<template>
  <div class="list">
    <table class="list__table" v-if="store.items.length != 0">
      <thead class="list__header">
        <tr>
          <th class="list__cell list__cell--empty"></th>
          <th class="list__cell" v-for="(column,index) in store.columns" :key="index">{{ column}}</th>
        </tr>
      </thead>
      <tbody class="list__body">
        <tr class="list__row" v-for="item in store.searchResult" :key="item.id">
          <td class="list__cell list__cell--checkbox">
            <button class="list__status-button" 
                    :class="{'list__status-button--checked': item.status == 'Выполнено'}" 
                    @click="item.status = item.status == 'Выполнено' ? 'В работе' : 'Выполнено', store.saveItems(item.id)">
              <img class="list__status-icon" src="../assets/img/check.svg" v-if="item.status == 'Выполнено'">
            </button>
          </td>
          <td class="list__cell list__cell--description">{{ item.description }}</td>
          <td class="list__cell list__cell--status" :class="{'list__cell--done': item.status == 'Выполнено'}">{{ item.status }}</td>
          <td class="list__cell list__cell--date">{{ format(item.date, 'dd.MM.yyyy') }}</td>
        </tr>
      </tbody>
    </table>
    <h2 class="list__message" v-if="store.isLoading == false && store.items.length == 0">Нет активных задач</h2>
    <h2 class="list__message" v-if="store.isLoading == true">Загрузка...</h2>
  </div>
</template>
