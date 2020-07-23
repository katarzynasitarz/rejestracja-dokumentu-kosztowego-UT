<template>
  <v-app>
    <v-content>
      <Document />
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

  data: () => ({
    //
  }),
};
</script>
