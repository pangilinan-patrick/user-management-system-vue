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
-->

<template>
  <div class="q-pa-md" style="max-width: 600px">
    <h5 class="q-my-none q-mb-md">Add User</h5>
    <q-form
      @submit.prevent="rowSelected === true ? editForm() : submitForm()"
      class="q-gutter-md"
    >
      <div class="q-gutter-md row items-start">
        <!-- name, username, email, phone, website -->
        <q-input
          filled
          v-model="form.name"
          label="Full Name *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.username"
          label="Username *"
          required
        ></q-input>
      </div>
      <div class="q-gutter-md row items-start">
        <q-input
          filled
          v-model="form.email"
          label="Email *"
          type="email"
          required
          :rules="[emailRule()]"
        ></q-input>
      </div>
      <div class="q-gutter-md row items-start">
        <q-input filled v-model="form.phone" label="Phone *" required></q-input>
        <q-input
          filled
          v-model="form.website"
          label="Website *"
          required
        ></q-input>
      </div>
      <!-- address: street, suite, city, zipcode -->
      <h6 class="q-my-none q-mb-md">Address</h6>
      <div class="q-gutter-md row items-start">
        <q-input
          filled
          v-model="form.address.street"
          label="Street *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.address.suite"
          label="Suite *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.address.city"
          label="City *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.address.zipcode"
          label="Zipcode *"
          required
        ></q-input>
      </div>
      <!-- Company: name, bs, catchPhrase-->
      <h6 class="q-my-none q-mb-md">Company</h6>
      <div class="q-gutter-md row items-start">
        <q-input
          filled
          v-model="form.company.name"
          label="Company Name *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.company.bs"
          label="BS *"
          required
        ></q-input>
        <q-input
          filled
          v-model="form.company.catchPhrase"
          label="Catch Phrase *"
          required
        ></q-input>
      </div>
      <q-btn
        type="submit"
        :label="rowSelected === true ? 'Edit' : 'Add'"
        :color="rowSelected === true ? 'positive' : 'primary'"
      ></q-btn>
      <q-btn @click="testInput()" label="Test" color="positive"></q-btn>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { rowSelected, mergedRows, form } from "../composables/Users";
import eventBus from "components/eventBus";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

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

    const submitForm = () => {
      // validate the form inputs
      if (!form.value.name || !form.value.username || !form.value.email) {
        // display an error message
        $q.notify({
          message: "All fields are required",
          color: "negative",
        });
        return;
      }
      // console.log(form.value);

      let maxId = 0;
      maxId = Math.max(...mergedRows.value.map((r) => r.id));
      form.value.id = maxId + 1;

      router.push("/list-of-users");
      // btnLoadingState.value = true;
      axios
        // add the todo entry using post
        .post("http://localhost:3000/users", form.value)
        .then((response) => {
          if (response.status === 201) {
            // get the current max ID from the table and increment the id for the new item
            // const maxId = Math.max(...response.data.map((r) => r.id));
            const newItem = { ...response.data, id: maxId + 1 };
            // console.log(newItem);
            // mergedRows.value.unshift(newItem);
            eventBus.emit("user-added", newItem);
          }
          // btnLoadingState.value = false;
        });

      // display a success message
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Form Submitted!",
      });

      // call resetForm() method
      resetForm();
    };

    const resetForm = () => {
      // clear the form inputs
      form.value.name = "";
      form.value.username = "";
      form.value.email = "";
      form.value.address.street = "";
      form.value.address.suite = "";
      form.value.address.city = "";
      form.value.address.zipcode = "";
      form.value.phone = "";
      form.value.website = "";
      form.value.company.name = "";
      form.value.company.catchPhrase = "";
      form.value.company.bs = "";
    };

    const editForm = () => {
      axios
        // add the todo entry using post
        .put(`http://localhost:3000/users/${form.value.id}`, form.value)
        .then((response) => {
          if (response.status === 200) {
            // update the entry in the selected index
            Object.assign(mergedRows.value[form.value.id], form.value);
            // reset the input values after update
            resetForm();
            rowSelected.value = {};
          }
          // btnLoadingState.value = false;
        });

      // display a success message
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Query edited!",
      });

      router.push("/list-of-users");
    };

    const testInput = () => {
      form.value.name = "wef";
      form.value.username = "sdf";
      form.value.email = "woiejf@gmail.com";
      form.value.address.street = "wefjo[j]";
      form.value.address.suite = "oiewjf";
      form.value.address.city = "woiej";
      form.value.address.zipcode = "woiejf";
      form.value.phone = "weifj";
      form.value.website = "eifj";
      form.value.company.name = "weifj";
      form.value.company.catchPhrase = "weifj";
      form.value.company.bs = "weifj";
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
      submitForm,
      resetForm,
      editForm,
      testInput,
      rowSelected,
    };
  },
};
</script>
