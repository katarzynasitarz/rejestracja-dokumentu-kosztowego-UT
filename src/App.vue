<template>
  <v-app>
    <v-content>
      <Document :documentObject="document" />
      <v-btn @click="showMe()">POKA</v-btn>
    </v-content>
  </v-app>
</template>

<script>
import Document from "./components/Document";

export default {
  name: "App",

  components: {
    Document,
  },

  data() {
    return {
      document: {
        receiveDate: null,
        issueDate: null,
        paymentDate: null,
        invoiceNumber: null,
        expenseCategory: null,
        invoiceComments: null,
      },
    };
  },
  methods: {
    showMe() {
      console.log(this.document);
    },
  },
};
</script>
