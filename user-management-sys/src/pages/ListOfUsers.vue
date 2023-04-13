<script>
import { ref, nextTick, onBeforeUnmount } from "vue";
import { rowSelected, getUsers, mergedRows, form } from "../composables/Users";
import axios from "axios";
import eventBus from "components/eventBus";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "list-of-users",
  setup() {
    const $q = useQuasar();
    let columns = ref([
      {
        name: "actions",
        label: "Actions",
        field: "id",
        align: "center",
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

    const router = useRouter();
    // destroy event listening upon unmount
    onBeforeUnmount(() => {
      eventBus.off("user-added");
    });

    function editSelected(selected) {
      form.value.id = selected.value.id;
      form.value.name = selected.value.name;
      form.value.username = selected.value.username;
      form.value.email = selected.value.email;
      form.value.address.street = selected.value.address.street;
      form.value.address.suite = selected.value.address.suite;
      form.value.address.city = selected.value.address.city;
      form.value.address.zipcode = selected.value.address.zipcode;
      form.value.phone = selected.value.phone;
      form.value.website = selected.value.website;
      form.value.company.name = selected.value.company.name;
      form.value.company.bs = selected.value.company.bs;
      form.value.company.catchPhrase = selected.value.company.catchPhrase;
      rowSelected.value = true;

      router.push("/add-user");
      // console.log(props);
    }

    const deleteSelected = (selected) => {
      $q.dialog({
        dark: true,
        title: "Confirm",
        message: `Would you like to delete entry ID ${selected.value.id}?`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          axios
            // delete the selected entry
            .delete(`http://localhost:3000/users/${selected.value.id}`)
            .then((response) => {
              if (response.status === 200) {
                // create a new array without the selected row using filter
                mergedRows.value = mergedRows.value.filter(
                  (row) => row.id !== selected.value.id
                );

                rowSelected.value = {};
              }
              // btnLoadingState.value = false;
            });

          // display a success message
          $q.notify({
            color: "red-4",
            textColor: "white",
            icon: "clear",
            message: `Deleted entry ID ${selected.value.id}!`,
          });
        })
        .onCancel(() => {
          $q.notify({
            color: "primary",
            textColor: "white",
            icon: "notifications",
            message: "Operation cancelled.",
          });
        });
    };

    return { columns, mergedRows, editSelected, deleteSelected };
  },
};
</script>

<template>
  <q-page class="q-ma-x1">
    <!-- table showing the data fetched from API -->
    <q-table
      flat
      bordered
      title="List of Users"
      :rows="mergedRows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <!-- <q-btn color="primary" @click="showDialog(props.value)">
            Show Dialog
          </q-btn> -->
          <q-btn
            @click="editSelected(props.value)"
            class="q-pa-xs q-ma-xs"
            color="primary"
            >Edit</q-btn
          >
          <q-btn
            @click="deleteSelected(props.value)"
            class="q-pa-xs q-ma-xs"
            color="negative"
            >Delete</q-btn
          >
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
