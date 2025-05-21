import { defineStore } from 'pinia';
import { format } from "date-fns"
const api_url = 'http://localhost:3000/api/'
export const useListStore = defineStore('list', {
    state: () => ({
        title : "To do list",
        columns : ['Описание','Статус','Дата'],
        items: [],
        selectedFilter: 2,
        searchQuery: '',
        showModal: false,
        newTaskDescription: ''
    }),
    getters: {
        searchResult() {
            if(!this.searchQuery) return this.items;
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item => {
                return (
                    item.description.toLowerCase().includes(query) ||
                    item.status.toLowerCase().includes(query) ||
                    String(item.date).includes(query)
                );
            });
        }
    },
    actions: {
        async fetchItems() {
            try {
                const response = await fetch(api_url)
                this.items = await response.json()
            } catch (error) {
                console.log(error)
            }
        },
        async sendItem() {
            if (this.newTaskDescription.match(/\S/)) {
                const newItem = {
                "id" : String(this.items.length),
                "description": this.newTaskDescription.trim(),
                "status": "В работе",
                "date": format(new Date(), 'yyyy-MM-dd')
            }
            try {
                const response = await fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                })
            } catch (error) {
                console.log(error)
            }
            this.items.push(newItem)
            this.showModal = false
            this.newTaskDescription = ""
        }
    },
    async saveItems(itemId) {
            try {
            const response = await fetch(`${api_url}${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.items[itemId])
            })
        } catch (error) {
            console.log(error)
        }
    },
    sortItemsByDate() {
         if (Math.abs(this.selectedFilter) == 2 && this.selectedFilter > 0) {
            this.items.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (Math.abs(this.selectedFilter) == 2 && this.selectedFilter < 0) {
            this.items.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    },
    sortItemsByStatus() {
        if (Math.abs(this.selectedFilter) == 1 && this.selectedFilter > 0) {
            this.items.sort((a, b) => {
                if (a.status === "Выполнено" && b.status !== "Выполнено") return -1;
                if (a.status !== "Выполнено" && b.status === "Выполнено") return 1;
            });
        } else if (Math.abs(this.selectedFilter) == 1 && this.selectedFilter < 0) {
            this.items.sort((a, b) => {
                if (a.status === "В работе" && b.status !== "В работе") return -1;
                if (a.status !== "В работе" && b.status === "В работе") return 1;
                return 0;
            });
        }
    },
    changeFilter() {
        if (this.selectedFilter == 1) {
            this.selectedFilter = 2
        } else {
            this.selectedFilter = 1
        }
        this.sortItemsByDate()
        this.sortItemsByStatus()
    },
    changeFilterDirection() {
        this.selectedFilter = -this.selectedFilter
        this.sortItemsByDate()
        this.sortItemsByStatus()
    }
}});
