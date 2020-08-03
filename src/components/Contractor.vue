<template>
  <v-container fluid>
    <v-toolbar height="100">
      <v-row justify="end">
        <v-combobox
          v-model="select"
          :items="items"
          label="Wyszukaj Kontrahenta"
          multiple
          chips
          item-text="name"
          class="pl-4 pt-7"
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

        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn tile color="cyan" class="mt-9 mx-3" dark v-on="on"
              >Dodaj Kontrahenta</v-btn
            >
          </template>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <span class="headline">Dodaj Kontrahenta</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="contractorObject.name"
                        :rules="nameRules"
                        label="Nazwa firmy"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.address.street"
                        :rules="adresRules"
                        label="Ulica"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.address.houseNumber"
                        :rules="adresRules"
                        label="numer domu"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.address.postalCode"
                        :rules="adresRules"
                        label="kod pocztowy"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.address.city"
                        :rules="adresRules"
                        label="miasto"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.nip"
                        type="number"
                        :rules="nipRules"
                        :counter="10"
                        label="NIP firmy"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="contractorObject.email"
                        :rules="emailRules"
                        label="E-mail firmy"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="dark grey" class="mr-4" @click="close" dark
                  >Anuluj</v-btn
                >
                <v-btn
                  color="cyan"
                  @click="saveContractor(contractorObject)"
                  dark
                  >Dodaj</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
          <v-alert type="success" v-if="visibility"> Taki kontrahent istnieje w bazie </v-alert>
        </v-dialog>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "Contractor",
  props: {
    value: Object,
  },

  data: () => ({
    contractorObject: {
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
    dialog: false,
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
    close() {
      this.dialog = false;
    },

    // async getContractor() {
    // try {
    //   let result = await this.sendAjaxWithParams(this.appUrls.getContractor, {});
    //   this.visibility = result.exists;
    //   } catch (e) {
    //   console.log("error", e);
    //   }
    // },

    // async get() {
    //    let params = {
    //      contractor: this.contractorObject
    //     };
    //     try {
    //       let result = await this.sendAjaxWithParams(this.appUrls.getContractor, params);
    //       console.log(result);
    //     } catch (e) {
    //      console.error( e);
    //     }
    //   },

    async saveContractor(contr) {
      let params = {
        contractor: contr,
      };
      console.log(contr);
      console.log(params);
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
