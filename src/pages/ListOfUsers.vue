<!-- 
  USER MANAGEMENT SYSTEM
  By Patrick Pangilinan
  DLSL 
-->

<template>
  <q-page class="q-ma-x1">
    <!-- table showing the data fetched from API -->
    <q-table
      flat
      bordered
      title="List of Users"
      class="my-sticky-column-table q-ma-md"
      :rows="mergedRows"
      :columns="columns"
      row-key="id"
    >
      <!-- column for the actions (edit, delete) -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            @click="editSelected(props.value)"
            class="q-pa-xs q-ma-xs"
            color="primary"
            icon="edit"
          />
          <q-btn
            @click="deleteSelected(props.value)"
            :loading="deleteBtnLoadingState"
            class="q-pa-xs q-ma-xs"
            color="negative"
            icon="delete"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { rowSelected, getUsers, mergedRows, form } from "../composables/Users";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  name: "list-of-users",
  setup() {
    // For notify and dialog
    let deleteBtnLoadingState = ref(false);
    const $q = useQuasar();

    // Initialization of table columns
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

    // GET request to populate table
    getUsers();

    // For routing to the add user page
    const router = useRouter();

    // Edit Function
    function editSelected(selected) {
      // Add the selected values into the form
      form.value = {
        ...selected.value,
        address: { ...selected.value.address },
        company: { ...selected.value.company },
      };
      rowSelected.value = true;
      // Go to add user page
      router.push("/add-user");
    }

    // Delete function
    const deleteSelected = (selected) => {
      deleteBtnLoadingState.value = true;
      // Modal dialog for confirmation
      $q.dialog({
        dark: true,
        title: "Confirm",
        message: `Would you like to delete entry ID ${selected.value.id}?`,
        cancel: true,
        persistent: true,
      })
        // Send PUT request after confirming and removing selected value
        .onOk(async () => {
          try {
            const response = await axios.delete(
              `https://jsonplaceholder.typicode.com/users/${selected.value.id}`
            );
            // if success
            if (response.status === 200) {
              // create a new array without the selected row using filter
              mergedRows.value = mergedRows.value.filter(
                (row) => row.id !== selected.value.id
              );
              rowSelected.value = {};

              // display a success message
              $q.notify({
                color: "red-4",
                textColor: "white",
                icon: "clear",
                message: `Deleted entry ID ${selected.value.id}!`,
              });
              deleteBtnLoadingState.value = false;
            } else {
              throw new Error("Network response failed!");
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Error:", error);
              // display an error message
              $q.notify({
                color: "red-4",
                textColor: "white",
                icon: "error",
                message: `Error: ${error.message}`,
              });
              deleteBtnLoadingState.value = false;
            }
          }
        })
        .onCancel(() => {
          $q.notify({
            color: "blue-4",
            textColor: "white",
            icon: "notifications",
            message: "Operation cancelled.",
          });
          deleteBtnLoadingState.value = false;
        });
    };

    return {
      columns,
      mergedRows,
      editSelected,
      deleteSelected,
      deleteBtnLoadingState,
    };
  },
};
</script>
