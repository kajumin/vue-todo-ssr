<template>
	<section class="real-app">
		<input type="text"
		class="add-input"
		autofocus="autofocus" 
		placeholder="接下来要做什么?"
		@keyup.enter="addTodo" 
		>
		<item 
		v-for="todo in filterTodos"
		:key="todo.id"
		:todo="todo"
		@del="deleteTodo"
		></item>
		<tabs 
		:filter="filter" 
		:todos="todos"
		@toggle="toggleFilter"
		@clearCompleted = "clearCompleted"
		></tabs>
	</section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
	export default {
	 	metaInfo: {
    		title: 'todo page 页面'
  		},
		data () {
			return {
				todos: [
					{
						id: 0,
						content: 'this is todo',
						completed: false
					}
				],
				filter: 'all'
			}
		},
		methods: {
			addTodo (e) {
				const val = e.target.value.trim()
				if (val === '') return
				this.todos.unshift({
					id: Math.trunc(Math.random() * 10000), 
					content: val,
					completed: false
				})
				e.target.value = ''
			},
			deleteTodo (id) {
				this.todos = this.todos.filter(item => item.id !== id)
			},
			toggleFilter (state) {
				this.filter = state
			},
			clearCompleted () {
				this.todos = this.todos.filter(item => !item.completed)
			}
		},
		components: {
			Item,
			Tabs
		},
		computed: {
			filterTodos () {
				if (this.filter === 'all') {
					return this.todos
				} else {
					const completed = this.filter === 'completed'
					return this.todos.filter(item => item.completed === completed)
				} 
			}
		}
	}
</script>
<style scoped lang="stylus">
.real-app {
	width 600px
	margin 0 auto
	box-shadow 0 0 5px #666
}
.add-input {
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit 
    line-height 1.4em
    border none
    outline none 
    color inherit 
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
}
</style>
