<!-- Step 3: Create an Add User page -->
<!-- - Create a form to input the user information. -->
<!-- - When the form is submitted, use Axios to send a POST request to the server with the user information. -->
<!---->
<!-- Step 4: Implement PUT and DELETE requests -->
<!-- In the List of Users page, add an "Edit" button next to each user. When the button is clicked, navigate to the Add User page and pre-populate the form with the user information. -->
<!-- Add a "Delete" button next to each user. When the button is clicked, send a DELETE request to the server with the user ID. -->
<!-- In the Add User page, modify the form submission logic to send a PUT request if the form is pre-populated, otherwise send a POST request. -->
<!---->
<!-- Step 5: Test the User Management System -->
<!-- Test the GET, POST, PUT, and DELETE request methods by adding, editing, and deleting users. -->
<!-- Verify that the table in the List of Users page is updated accordingly. -->
<!---->
<!-- Step 6: Save the project folder to the repository -->
<!-- Create a new branch and name it “quasar-axios-user-management” -->
<!-- Push the project folder to the repository you have created in Gitlab. -->

<template>
  <div class="q-pa-md" style="max-width: 600px">
    <h5 class="q-my-none q-mb-md">Add User</h5>
    <q-form ref="form" @submit.prevent="submitForm" class="q-gutter-md">
      <div class="q-gutter-md row items-start">
        <q-input filled v-model="form.name" label="Full Name *" required></q-input>
        <q-input filled v-model="form.username" label="Username *" required></q-input>
      </div>
      <div class="q-gutter-md row items-start">
        <q-input filled v-model="form.email" label="Email *" type="email" required :rules="[emailRule]"></q-input>
      </div>
      <q-btn type="submit" label="Submit" color="primary"></q-btn>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      form: ref({
        id: 1,
        name: null,
        username: null,
        email: null,
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        phone: null,
        website: null,
        companyName: null,
        catchPhrase: null,
        bs: null,
      }),
    };
  },
  computed: {
    emailRule() {
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
    },
  },
  methods: {
    submitForm() {
      // validate the form inputs
      if (!this.form.name || !this.form.username || !this.form.email) {
        // display an error message
        this.$q.notify({
          message: "All fields are required",
          color: "negative",
        });
        return;
      }

      // display a success message
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Form Submitted!",
      });

      // reset the form
      this.$refs.form.reset();

      // call resetForm() method
      this.resetForm();
    },
    resetForm() {
      // clear the form inputs
      this.form.name = "";
      this.form.username = "";
      this.form.email = "";
    },
  },
};
</script>
