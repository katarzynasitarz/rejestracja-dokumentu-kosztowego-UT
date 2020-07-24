<template>
  <v-form ref="form">
    <v-card-text class="grey lighten-4">
      <v-sheet width="1000" height="auto" class="mx-auto pa-8">
        <v-card-text align="center" class="py-10">
          <h1>Rejestracja dokumentu - 11223345</h1>
        </v-card-text>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Podstawowe dane dokumentu:
          </v-card-title>

          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu1"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="receiveDate"
                      label="Data wpłynięcia"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="receiveDate"
                    locale="pl"
                    @click="$refs.menu1.save(chosenReceiveDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu2"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="issueDate"
                      label="Data wystawienia"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="issueDate"
                    locale="pl"
                    @click="$refs.menu2.save(chosenIssueDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu3"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="paymentDate"
                      label="Termin płatności"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="paymentDate"
                    locale="pl"
                    @click="$refs.menu3.save(chosenPaymentDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Nr faktury" v-model="invoiceNumber">
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  label="Kategoria wydatku"
                  v-model="expenseCategory"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea
                  label="Uwagi do dokumentu"
                  rows="2"
                  v-model="invoiceComments"
                ></v-textarea>
              </v-col> </v-row
          ></v-container>
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Dane kontrahenta:
          </v-card-title>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          exercitationem laudantium laborum non saepe quidem ex doloribus, fugit
          placeat natus dolorum! Cumque ab voluptates quasi pariatur
          perspiciatis labore voluptatem iste.</v-card
        >

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Dane dotyczące dokumentu:
          </v-card-title>

          <Table />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Dodatkowe dokumenty:
          </v-card-title>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe
          provident, ab accusantium sunt totam delectus molestiae illo modi
          quasi quis tempora suscipit fuga tenetur repellendus magnam quam
          excepturi optio?</v-card
        >
      </v-sheet>
    </v-card-text>
    <v-btn color="success" @click="send()">Wyślij</v-btn>
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
    receiveDate: null,
    issueDate: null,
    paymentDate: null,
    invoiceNumber: "",
    expenseCategory: "",
    invoiceComments: "",
    menu1: false,
    menu2: false,
    menu3: false,
    modal: false,
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    send() {
      console.log(
        this.receiveDate,
        this.issueDate,
        this.paymentDate,
        this.inviceNumber
      );
    },
  },
  computed: {
    chosenReceiveDate: function() {
      return new Date().toISOString().substr(0, 10);
    },
    chosenIssueDate: function() {
      return new Date().toISOString().substr(0, 10);
    },
    chosenPaymentDate: function() {
      return new Date().toISOString().substr(0, 10);
    },
  },
};
</script>
