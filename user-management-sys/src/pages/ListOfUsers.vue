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
        name: "actions",
        label: "Actions",
        field: "id",
        align: "center",
        // define a custom slot to render the button for each row
        // you can use the `scope` parameter to access the row data
        // and define the button behavior
        // this example renders a button with a click event to show a dialog
        // but you can replace it with your own button component and behavior
        // or use any other UI framework or HTML element
        format: (val, row) => {
          return {
            slot: "actions",
            value: row,
          };
        },
      },
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
    <q-table
      flat
      bordered
      title="Todos"
      :rows="mergedRows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- <q-btn color="primary" @click="showDialog(props.value)">
            Show Dialog
          </q-btn> -->
          <q-btn class="q-pa-xs q-ma-xs" color="primary">Edit</q-btn>
          <q-btn class="q-pa-xs q-ma-xs" color="negative">Delete</q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
