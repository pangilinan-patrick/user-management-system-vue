import { ref } from "vue";
import axios from "axios";

// initialize mergedRows for nested data
const mergedRows = ref([]);
const rowSelected = ref(false);

const getUsers = () => {
  axios.get("http://localhost:3000/users").then((response) => {
    // impute the value of response into each row
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
  return mergedRows;
};
const form = ref({
  id: 1,
  name: "",
  username: null,
  email: null,
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: null,
  website: null,
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
});

export { mergedRows, getUsers, form, rowSelected };
