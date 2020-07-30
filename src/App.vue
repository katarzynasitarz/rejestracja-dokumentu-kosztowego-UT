<template>
  <v-app>
    <Document :documentObject="document" />
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
        // sumNetto: null,
        // sumVat: null,
        // sumBrutto: null,
        documentContent: {
          items: [],
        },
      },
      path: "/Akademia 2020/Testowy/Folder",
      documents: {
        items: [],
      },
      objectTypeId: "cmis:document",
      context: window.context,
      document: window.context ? window.context.binding.get("value") : {},
    };
  },
  closeForm(document) {
    if (this.context) {
      this.context.binding.set("value", document);
      this.context.trigger();
    }
  },
};
</script>
