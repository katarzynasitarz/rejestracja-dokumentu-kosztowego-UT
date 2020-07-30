<template>
  <v-app>
    <v-content>
      <Document v-model="document" />
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
      context: window.context,
      document: window.context ? window.context.binding.get("value") : {mrcCaseHeader: {caseId: 1223}},
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
