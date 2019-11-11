<template>
  <div>
    <h3>Todo</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box">= Incomplete</span>
      </span>
      <span>
        <span class="complete-box">= Complete</span>
      </span>
    </div>
    <div class="todos">
      <div @dblclick="onDblClick(todo)"
           class="todo"
           v-for="todo in allTodos"
           :key="todo.id"
           v-bind:class="{'is-complete':todo.completed}">
        {{todo.title}}
        <i class="fas fa-trash-alt" @click="deleteTodo(todo.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: { ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDblClick(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };
      this.updateTodo(updTodo);
    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  }
};
</script>

<style lang="sass" scoped>
.todos
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-gap: 1rem
    @media(max-width: 768px)
      grid-template-columns: repeat(2, 2fr)

    @media(max-width: 500px)
      grid-template-columns: 1fr


    .todo
        border: 1px solid #ccc
        background: #41b883
        padding: 1rem
        border-radius: 5px
        text-align: center
        position: relative
        cursor: pointer


i
  position: absolute
  bottom: 10px
  right: 10px
  color: #fff
  cursor: pointer
.legend
  display: flex
  justify-content: space-around
  margin-bottom: 1rem

  .incomplete-box
    display: inline-block
    width: 10px
    height: 10px
    background: #41b883
  .complete-box
    display: inline-block
    width: 10px
    height: 10px
    background: #35495e

.is-complete
  background: #35495e
  color: #fff
</style>