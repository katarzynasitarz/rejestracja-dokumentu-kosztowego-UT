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
      path: "/Akademia 2020/Testowy/Folder",
      documents: {
        items: [],
      },
      objectTypeId: "cmis:document",
    };
  },
  methods: {
    showMe() {
      console.log(this.document);
    },
  },
};
</script>