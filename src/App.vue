<template>
  <v-app>
    <v-app-bar app color="white" dark>


    </v-app-bar>

    <v-content>
      <Contractor :contractorObject="document.contractor"/>
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

  data() {
    return {
      document: {
        contractor: {
                email: '',
                name: '',
                nip: '',
                address: '',
        }
      }
    }
  },
};
</script>
