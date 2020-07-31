<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="Wyszukaj Kontrahenta"
          multiple
          chips
          item-text="name"
        >
          <template v-slot:selection="data">
            <v-chip
              :key="JSON.stringify(data.item)"
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{ data.item.name + " " + data.item.value }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>

    <v-card-text
      class="headline
     font-weight-bold"
    >
      Dodaj kontrahenta
    </v-card-text>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.name"
            :rules="nameRules"
            label="Nazwa firmy"
            required
          ></v-text-field> </v-col
        ><v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.address.street"
            :rules="adresRules"
            label="Ulica"
            required
          ></v-text-field> </v-col
        ><v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.address.houseNumber"
            :rules="adresRules"
            label="numer domu"
            required
          ></v-text-field>
        </v-col> </v-row
      ><v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.address.postalCode"
            :rules="adresRules"
            label="kod pocztowy"
            required
          ></v-text-field> </v-col
        ><v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.address.city"
            :rules="adresRules"
            label="miasto"
            required
          ></v-text-field> </v-col
        ><v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.nip"
            type="number"
            :rules="nipRules"
            :counter="10"
            label="NIP firmy"
            required
          ></v-text-field> </v-col
        ><v-col cols="12" md="4">
          <v-text-field
            v-model="newContractor.email"
            :rules="emailRules"
            label="E-mail firmy"
            required
          ></v-text-field
        ></v-col>

        <!-- <v-alert type="success" v-if="visibility"> Taki kontrahent istnieje w bazie </v-alert> -->

        <v-btn color="dark grey" class="mr-4" @click="reset" dark>
          Wyczyść</v-btn
        >
        <v-btn color="cyan" @click="saveContractor" dark>
          Dodaj
        </v-btn>
        <v-alert type="success" v-if="visibility">
          Taki kontrahent istnieje w bazie
        </v-alert>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Contractor",
  props: ["value"],

  data: () => ({
    contractorObject: {},
    newContractor: {
      address: {},
    },

    visibility: false,
    valid: true,
    nameRules: [(v) => !!v || "Należy wprowadzić nazwę firmy"],
    emailRules: [
      (v) => !!v || "Należy wprowadzić e-mail firmy",
      (v) => /.+@.+\..+/.test(v) || "Pamiętaj, e-mail ma swoją strukturę",
    ],
    adresRules: [(v) => !!v || "Adres firmy jest wymagany"],
    nipRules: [
      (v) => !!v || "Proszę wprowadzić NIP firmy",
      (v) => (v && v.length == 10) || "NIP musi zawierać 10 cyfr",
    ],
    select: [],
    items: [
      { name: "Drogi, Pamiętniku", value: "NIP:106-34-00-062" },
      { name: "Pamiątki z podróży", value: "NIP:356-00-10-056" },
      { name: "Dexynfex", value: "NIP:123-08-70-567" },
      { name: "Kuchnia Węgierska", value: "NIP:134-12-10-042" },
    ],
  }),

  watch: {
    value: {
      handler(val) {
        this.contractorObject = val;
      },
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async saveContractor() {
      let params = {
        contractor: this.newContractor,
      };
      try {
        let result = await this.sendAjaxWithParams(
          this.appUrls.saveContractor,
          params
        );
        this.visibility = result.exists;
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
