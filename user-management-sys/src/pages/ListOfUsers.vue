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
import { ref, nextTick, onBeforeUnmount } from "vue";
import axios from "axios";
import eventBus from "components/eventBus";
import { getUsers, mergedRows } from "../composables/Users";

export default {
  name: "list-of-users",
  setup() {
    let columns = ref([
      {
        name: "id",
        label: "ID",
        align: "left",
        field: "id",
      },
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
      {
        name: "street",
        label: "Street",
        align: "left",
        field: "street",
      },
      {
        name: "suite",
        label: "Suite",
        align: "left",
        field: "suite",
      },
      {
        name: "city",
        label: "City",
        align: "left",
        field: "city",
      },
      {
        name: "zipcode",
        label: "Zipcode",
        align: "left",
        field: "zipcode",
      },
      {
        name: "phone",
        label: "Phone",
        align: "left",
        field: "phone",
      },
      {
        name: "website",
        label: "Website",
        align: "left",
        field: "website",
      },
      {
        name: "companyName",
        label: "Company Name",
        align: "left",
        field: "companyName",
      },
      {
        name: "catchPhrase",
        label: "Catch Phrase",
        align: "left",
        field: "catchPhrase",
      },
      {
        name: "bs",
        label: "BS",
        align: "left",
        field: "bs",
      },
    ]);

    getUsers();

    eventBus.on("user-added", (newUser) => {
      console.log(newUser);
      mergedRows.value.unshift(newUser);
    });

    // destroy event listening upon unmount
    onBeforeUnmount(() => {
      eventBus.off("user-added");
    });

    const asdf = () => {
      console.log();
    };

    return { columns, mergedRows };
  },
};
</script>

<template>
  <q-page class="q-ma-x1">
    <!-- table showing the data fetched from API -->
    <q-table title="Todos" :rows="mergedRows" :columns="columns" row-key="id" />
  </q-page>
</template>
