<template>
  <v-app>
    <v-app-bar app color="white" dark> </v-app-bar>

    <v-content>
      <HelloWorld />
      <!-- <Table2 /> -->
    </v-content>
  </v-app>
</template>

<script>
// import Table from "./components/Table";
// import Table2 from "./components/Table2";
// import Contractor from "./components/Contractor";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
    // Table,
    // Table2,
    // Contractor,
  },

  data: () => ({
    //
  }),
};
</script>
