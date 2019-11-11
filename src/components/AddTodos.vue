
<template>
  <div>
    <div>
      <ul>
        <li class="alert" v-for="error in errors" :key="error.id">{{error}}</li>
      </ul>
    </div>
    <h3>Add Todo</h3>

    <div class="add">
      <form v-on:submit.prevent="onSubmit">
        <input type="text" v-model="title" placeholder="Add todo..." />
        <input type="submit" value="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      errors: []
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit() {
      if (this.title.trim() === "") {
        this.errors.push("Please add a todo");
      } else {
        this.addTodo(this.title);
        this.title = "";
        this.errors = [];
      }

      setTimeout(() => {
        this.errors = [];
      }, 2000);
    }
  }
};
</script>

<style lang="sass" scoped>
 form
   display: flex
 input[type="text"]
   flex: 10
   padding: 10px
   border: 1px solid #41b883
   outline: 0
input[type="submit"]
  flex: 2
  background: #41b883
  color: #fff
  border: 1px #41b883 solid
  cursor: pointer
.alert
  color: red
  font-size: 2rem
  list-style: none
  font-weight: 900
  
</style>