<template>
  <v-form>
    <v-card-text class="grey lighten-4">
      <v-sheet width="1000" height="auto" class="mx-auto pa-8">
        <v-card-text align="center" class="py-10">
          <h1>Rejestracja dokumentu - 11223345</h1>
        </v-card-text>

        <v-card outlined class="mx-6 mb-6">
          <v-toolbar>
            <v-toolbar-title class="font-weight-bold">
              Podstawowe dane dokumentu:
            </v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateTime1"
                      :rules="examDateRules"
                      prepend-icon="mdi-calendar-clock"
                      label="Data wpłynięcia"
                      readonly
                      clearable
                      v-on="on"
                    />
                  </template>

                  <v-tabs fixed-tabs>
                    <v-tab>
                      <v-icon>mdi-calendar-clock</v-icon>
                    </v-tab>
                    <v-tab>
                      <slot>
                        <v-icon>mdi-clock-outline</v-icon>
                      </slot>
                    </v-tab>
                    <v-tab-item>
                      <v-date-picker
                        v-if="menu1"
                        v-model="date1"
                        locale="pl"
                        @click:change="$refs.menu.save(date1)"
                      />
                    </v-tab-item>
                    <v-tab-item>
                      <v-time-picker
                        v-model="time1"
                        format="24hr"
                        @click:minute="$refs.menu.save(time1)"
                      />
                    </v-tab-item>
                  </v-tabs>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Data wystawienia"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Termin płatności"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Nr faktury"></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field label="Kategoria wydatku"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea label="Uwagi do dokumentu" rows="2"></v-textarea>
              </v-col> </v-row
          ></v-container>
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-toolbar>
            <v-toolbar-title class="font-weight-bold">
              Dane kontrahenta:
            </v-toolbar-title>
          </v-toolbar>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          exercitationem laudantium laborum non saepe quidem ex doloribus, fugit
          placeat natus dolorum! Cumque ab voluptates quasi pariatur
          perspiciatis labore voluptatem iste.</v-card
        >

        <v-card outlined class="mx-6 mb-6">
          <v-toolbar>
            <v-toolbar-title class="font-weight-bold">
              Dane dotyczące dokumentu:
            </v-toolbar-title>
          </v-toolbar>
          <Table />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-toolbar>
            <v-toolbar-title class="font-weight-bold">
              Dodatkowe dokumenty:
            </v-toolbar-title> </v-toolbar
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe
          provident, ab accusantium sunt totam delectus molestiae illo modi
          quasi quis tempora suscipit fuga tenetur repellendus magnam quam
          excepturi optio?</v-card
        >
      </v-sheet>
    </v-card-text>
  </v-form>
</template>

<script>
import Table from "./Table";
export default {
  name: "Document",
  components: {
    Table,
  },

  data: () => ({
    menu1: false,
    date1: null,
    time1: null,
    dateTime1: null,
    tmpDate: null,
    examDateRules: [(v) => !!v || "To pole jest obowiązkowe."],
    requiredRule: (v) => !!v || "To pole jest obowiązkowe",
  }),
  methods: {
    buildDate() {
      this.tmpDate = new Date(this.date1 + "T" + this.time1).toISOString();
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  watch: {
    date1: function(val) {
      this.dateTime1 = val + " " + (this.time1 ? this.time1 : "00:00");
      this.buildDate();
    },
    time1: function(val) {
      const todayDate = new Date().toISOString().slice(0, 10);
      this.dateTime1 =
        (this.date1 ? this.date1 : (this.date1 = todayDate)) + " " + val;
      console.log("czas", val);
      this.buildDate();
    },
  },
};
</script>
