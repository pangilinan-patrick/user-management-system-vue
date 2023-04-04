<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "list-of-users",
  setup() {
    // initialize rows and columns with metadata
    let rows = ref([]);
    let columns = ref([
      {
        name: "name",
        label: "Full Name",
        align: "left",
        field: "name",
      },
      {
        name: "username",
        label: "Username",
        align: "left",
        field: "username",
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        field: "email",
      },
    ]);

    const getUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          rows.value = response.data;
        });
    };

    getUsers();

    return { rows, columns };
  },
};
</script>

<template>
  <q-page class="q-ma-x1">
    <!-- table showing the data fetched from API -->
    <q-table title="Todos" :rows="rows" :columns="columns" row-key="id" />
  </q-page>
</template>
