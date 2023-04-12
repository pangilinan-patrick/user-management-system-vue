import { ref } from "vue";
import axios from "axios";

// initialize mergedRows for nested data
const mergedRows = ref([]);

const getUsers = () => {
  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    // impute the value of response into each row
    // rows.value = response.data;
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

export { mergedRows, getUsers };
