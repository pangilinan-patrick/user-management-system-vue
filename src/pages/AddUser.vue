<!-- Step 6: Save the project folder to the repository -->
<!-- Create a new branch and name it “quasar-axios-user-management” -->
<!-- Push the project folder to the repository you have created in Gitlab. -->

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

    Add a clear button to remove selected when editing
-->

<!-- 
  USER MANAGEMENT SYSTEM
  By Patrick Pangilinan
  DLSL 
-->

<template>
  <div class="q-pa-md q-ma-sm form-container">
    <div class="form-header">
      &nbsp;
      <!-- Card-title design by Quasar -->
      <h5 class="q-my-none q-mb-md doc-card-title">User Form</h5>
      &nbsp;
    </div>
    <!-- if there's a selected row, use the editForm function, otherwise, submitForm -->
    <q-form
      class="q-pa-lg form-inside"
      @submit.prevent="rowSelected === true ? editForm() : submitForm()"
    >
      <h6 class="q-my-none q-mb-md">User Details</h6>
      <div class="q-gutter-md row items-start">
        <!-- name, username, email, phone, website -->
        <q-input
          class="col"
          filled
          v-model="form.name"
          label="Full Name *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.username"
          label="Username *"
          required
          :rules="[usernameRule()]"
        />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input
          class="col"
          filled
          v-model="form.email"
          label="Email *"
          type="email"
          required
          :rules="[emailRule()]"
        />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input
          class="col"
          filled
          v-model="form.phone"
          label="Phone *"
          required
          :rules="[phoneRule()]"
        />
        <q-input
          class="col"
          filled
          v-model="form.website"
          label="Website *"
          required
          :rules="[websiteRule()]"
        />
      </div>
      <!-- address: street, suite, city, zipcode -->
      <h6 class="q-my-none q-mb-md">Address</h6>
      <div class="q-gutter-md row items-start">
        <q-input
          class="col"
          filled
          v-model="form.address.street"
          label="Street *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.address.suite"
          label="Suite *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.address.city"
          label="City *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.address.zipcode"
          label="Zipcode *"
          required
          :rules="[zipcodeRule()]"
        />
      </div>
      <!-- Company: name, bs, catchPhrase-->
      <h6 class="q-my-none q-mb-md">Company</h6>
      <div class="q-gutter-md row items-start">
        <q-input
          class="col"
          filled
          v-model="form.company.name"
          label="Company Name *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.company.bs"
          label="BS *"
          required
        />
        <q-input
          class="col"
          filled
          v-model="form.company.catchPhrase"
          label="Catch Phrase *"
          required
        />
      </div>
      <!-- Edit or Add buttons -->
      <q-btn
        type="submit"
        class="form-button"
        :loading="btnLoadingState"
        :label="rowSelected === true ? 'Edit' : 'Add'"
        :color="rowSelected === true ? 'primary' : 'positive'"
      />
      <!-- Cancel button -->
      <q-btn
        class="form-button"
        label="Cancel"
        color="negative"
        @click="cancelEdit()"
        :class="rowSelected === true ? 'visible' : 'hidden'"
      />
      <!-- FOR TESTING PURPOSES -->
      <!-- <q-btn
        class="form-button"
        @click="testInput()"
        label="Test"
        color="positive"
      /> -->
    </q-form>
    <div class="form-footer"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { rowSelected, mergedRows, form } from "../composables/Users";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  setup() {
    // for notify
    const btnLoadingState = ref(false);
    const $q = useQuasar();
    const router = useRouter();

    // -----==== RULES ====----- //
    const emailRule = () => {
      return (val) => {
        if (!val) {
          return "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return "Invalid email format";
        } else if (!val.endsWith("@gmail.com")) {
          return "Email must be from gmail.com domain";
        } else {
          return true;
        }
      };
    };

    const usernameRule = () => {
      return (val) => {
        if (val && typeof val === "string" && val.length < 8) {
          return "Username must be at least 8 characters long!";
        }
        return true;
      };
    };

    const phoneRule = () => {
      return (val) => {
        if (!/^09\d{9}$/.test(val)) {
          return "Phone number must be in the PH format";
        }
        return true;
      };
    };

    const zipcodeRule = () => {
      return (val) => {
        if (!/^\d+$/.test(val)) {
          return "Zipcode must only accept numbers";
        }
        return true;
      };
    };

    const websiteRule = () => {
      return (val) => {
        if (!/\.pixel8$/.test(val)) {
          return 'Website must end with ".pixel8"';
        }
        return true;
      };
    };

    // -----==== RULES END ====----- //

    // Submit functionality
    const submitForm = () => {
      btnLoadingState.value = true;
      // Get the highest ID and add 1
      let maxId = 0;
      maxId = Math.max(...mergedRows.value.map((r) => r.id));
      form.value.id = maxId + 1;

      // send the post request using axios
      axios
        .post("https://jsonplaceholder.typicode.com/users/", form.value)
        .then((response) => {
          if (response.status === 201) {
            const newItem = { ...response.data, id: maxId + 1 };
            mergedRows.value.unshift(newItem);
          } else {
            throw new Error("Network response failed!");
          }
        })
        .then(() => {
          // Go to list of users for additional feedback
          router.push("/list-of-users");
          // display a success message
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Form Submitted!",
          });

          btnLoadingState.value = false;
          // call resetForm() method
          resetForm();
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            // display an error message
            console.error("Error:", error);
            $q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              message: `Error: ${error.message}`,
            });
            btnLoadingState.value = false;
          }
        });
    };

    const resetForm = () => {
      // clear the form inputs
      Object.assign(form.value, {
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    };

    // Cancel edit button
    const cancelEdit = () => {
      resetForm();

      rowSelected.value = {};
      $q.notify({
        color: "blue-4",
        textColor: "white",
        icon: "notifications",
        message: "Operation cancelled.",
      });
      router.push("/list-of-users");
    };

    // Edit functionality
    const editForm = () => {
      btnLoadingState.value = true;
      axios
        // edit the selected todo entry using PUT
        .put(
          `https://jsonplaceholder.typicode.com/users/${form.value.id}`,
          form.value
        )
        .then((response) => {
          if (response.status === 200) {
            // update the entry in the selected index
            mergedRows.value[form.value.id] = {
              ...mergedRows.value[form.value.id],
              ...form.value,
            };
            // reset the input values after update
          }
          // btnLoadingState.value = false;
        })
        .then(() => {
          // display a success message
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Query edited!",
          });

          resetForm();
          rowSelected.value = {};
          router.push("/list-of-users");
          btnLoadingState.value = false;
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            // display an error message
            console.error("Error:", error);
            $q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              message: `Error: ${error.message}`,
            });
            btnLoadingState.value = false;
          }
        });
    };

    // FOR TESTING PURPOSES
    // Uncomment the return and the button to use
    const testInput = () => {
      form.value.name = "Arnold";
      form.value.username = "Schwarzenegger";
      form.value.email = "arnold@gmail.com";
      form.value.address.street = "Chopper";
      form.value.address.suite = "Government";
      form.value.address.city = "Berlin";
      form.value.address.zipcode = "324";
      form.value.phone = "09238423985";
      form.value.website = "arnold.pixel8";
      form.value.company.name = "Arnold Corp.";
      form.value.company.catchPhrase = "Get to the choppa!";
      form.value.company.bs = "Lorem Ipsum";
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Tested",
      });
    };

    return {
      form,
      emailRule,
      usernameRule,
      phoneRule,
      websiteRule,
      zipcodeRule,
      submitForm,
      resetForm,
      editForm,
      cancelEdit,
      // testInput,
      rowSelected,
      btnLoadingState,
    };
  },
};
</script>
