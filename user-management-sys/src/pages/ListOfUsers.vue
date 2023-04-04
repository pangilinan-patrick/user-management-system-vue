<!--
    1. Include all data except for latitude and longitude (geo)
    2. Reset the form once there's input 
    3. AddUser: Email must end with @gmail.com
    4. Username must be >8 characters long 
    5. Phone number must be PH format
        - Starts at 09 and consist only 11 chars
    6. Zipcode must only accept nums
    7. Website must end with .pixel8 
    8. Rest of the fields are required
    9. Provide a modal when deleting an item
-->

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
