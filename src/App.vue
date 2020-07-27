<template>
  <v-app>
    <v-app-bar app color="white" dark>

    </v-app-bar>

    <v-content>
      <AddDocuments
      v-model="documents"
      :path="path"
      :objectTypeId="objectTypeId" />
    </v-content>
  </v-app>
</template>

<script>
import AddDocuments from "./components/AddDocument";

export default {
  name: "App",

  components: {
    AddDocuments,
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
