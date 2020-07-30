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
                      v-model="documentObject.receiveDate"
                      label="Data wpłynięcia"
                      :rules="[
                        () =>
                          !!documentObject.receiveDate || 'Pole jest wymagane.',
                      ]"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="documentObject.receiveDate"
                    locale="pl"
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
                      :rules="[rules.required]"
                      v-model="documentObject.issueDate"
                      label="Data wystawienia"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="documentObject.issueDate" locale="pl">
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
                      :rules="[rules.required]"
                      v-model="documentObject.paymentDate"
                      label="Termin płatności"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="documentObject.paymentDate"
                    locale="pl"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :rules="[rules.required]"
                  label="Nr faktury"
                  v-model="documentObject.invoiceNumber"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  :rules="[rules.required]"
                  label="Kategoria wydatku"
                  v-model="documentObject.expenseCategory"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea
                  :rules="[rules.required]"
                  label="Uwagi do dokumentu"
                  rows="2"
                  v-model="documentObject.invoiceComments"
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
            Pozycje Kosztowe::
          </v-card-title>
          <Table v-model="documentObject"/>
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
    <v-btn color="success" @click="submit()">Wyślij</v-btn>
  </v-form>
</template>

<script>
import Table from "./Table";
export default {
  name: "Document",
  components: {
    Table,
  },
  props: { documentObject: Object },

  data: () => ({
    menu1: false,
    menu2: false,
    menu3: false,
    modal: false,
    formHasErrors: false,
    rules: {
      required: (val) => !!val || "Pole jest wymagane.",
    },
    documentObject: {
      documentContent: {
        items: {
          positionList: [],
        },
      },
    },
  }),
  methods: {
    updateObject(sumNetto, sumVat, sumBrutto, positionList) {
      this.documentObject.sumNetto = sumNetto;
      this.documentObject.sumVat = sumVat;
      this.documentObject.sumBrutto = sumBrutto;
      this.documentObject.document.items.positionList = positionList;

      console.log(this.documentObject.sumNetto);
      console.log(this.documentObject.document.items.positionList);
    },
    submit() {
      console.log(this.documentObject.invoiceNumber, this.invoiceComments);
      console.log(typeof this.paymentDate);
      this.formHasErrors = false;
      Object.keys(this.form.documentObject).forEach((f) => {
        if (!this.form.documentObject[f]) this.formHasErrors = true;
        this.$refs.form.validate();
      });
    },
  },
  computed: {
    form() {
      return {
        documentObject: {
          receiveDate: this.receiveDate,
          issueDate: this.issueDate,
          paymentDate: this.paymentDate,
          invoiceNumber: this.invoiceNumber,
          expenseCategory: this.expenseCategory,
          invoiceComments: this.invoiceComments,
        },
      };
    },
  },
};
</script>
