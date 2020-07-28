<template>
  <v-app>
    <v-app-bar app color="white" dark> </v-app-bar>

    <v-content>
<<<<<<< HEAD
      <AddDocuments
        v-model="documents"
        :path="path"
        :objectTypeId="objectTypeId"
      />
=======
>>>>>>> de1b42b8fa64034646b3970b2286e39dba0cb3f6
      <Contractor />
    </v-content>
  </v-app>
</template>

<script>
<<<<<<< HEAD
import AddDocuments from "./components/AddDocument";
=======
>>>>>>> de1b42b8fa64034646b3970b2286e39dba0cb3f6
import Contractor from "./components/Contractor";

export default {
  name: "App",

  components: {
<<<<<<< HEAD
    AddDocuments,
    Contractor,
=======
    Contractor
>>>>>>> de1b42b8fa64034646b3970b2286e39dba0cb3f6
  },

  data: () => ({
    path: "/Akademia 2020/Testowy/Folder",
    documents: {
      items: [],
    },
    objectTypeId: "cmis:document",
  }),
};
</script>
