<template>
  <v-app>
    <!-- <v-app-bar app color="white" dark> </v-app-bar> -->

    <v-content>
      <Table />
    </v-content>
  </v-app>
</template>

<script>
import Table from "./components/Table";

export default {
  name: "App",

  components: {
    Table,
  },

  data: () => ({
    //
  }),
};
</script>
