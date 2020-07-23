<template>
  <v-app>
    <v-app-bar app color="white" dark> </v-app-bar>

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
