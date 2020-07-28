<template>
  <v-app>
    <v-app-bar app color="white" dark>


    </v-app-bar>

    <v-content>
<<<<<<< HEAD
      <AddDocuments
      v-model="documents"
      :path="path"
      :objectTypeId="objectTypeId" />
=======
      <Contractor />
>>>>>>> 477712d40991e3b1b28d5fd60fbac8f2d9661752
    </v-content>
  </v-app>
</template>

<script>
<<<<<<< HEAD
import AddDocuments from "./components/AddDocument";
=======
import Contractor from "./components/Contractor";
>>>>>>> 477712d40991e3b1b28d5fd60fbac8f2d9661752

export default {
  name: "App",

  components: {
<<<<<<< HEAD
    AddDocuments,
=======
    Contractor
>>>>>>> 477712d40991e3b1b28d5fd60fbac8f2d9661752
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
