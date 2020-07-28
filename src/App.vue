<template>
  <v-app>
    <v-app-bar app color="white" dark>


    </v-app-bar>

    <v-content>
      <Contractor />
    </v-content>
  </v-app>
</template>

<script>
import Contractor from "./components/Contractor";

export default {
  name: "App",

  components: {
    Contractor
  },

  data: () => ({
    path: '/Akademia 2020/Testowy/Folder',
    documents: {
    items:[]
    },
    objectTypeId: 'cmis:document'
  }),
};
</script>
