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

    // initialize mergedRows for nested data
    const mergedRows = ref([]);

    const getUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          // impute the value of response into each row
          rows.value = response.data;
          // iterate over each property of response.data
          mergedRows.value = response.data.map((row) => {
            return {
              // add existing non-nested values from row
              ...row,
              // nested values
              street: row.address.street,
              suite: row.address.suite,
              city: row.address.city,
              zipcode: row.address.zipcode,
              companyName: row.company.name,
              catchPhrase: row.company.catchPhrase,
              bs: row.company.bs,
            };
          });
        });
    };

    getUsers();

    return { rows, columns, mergedRows };
  },
};
</script>

<template>
  <q-page class="q-ma-x1">
    <!-- table showing the data fetched from API -->
    <q-table title="Todos" :rows="mergedRows" :columns="columns" row-key="id" />
  </q-page>
</template>
