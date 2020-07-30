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
                      v-model="currentDocument.receivedDate"
                      label="Data wpłynięcia"
                      :rules="[
                        v =>
                          !!v ||
                          'Pole jest wymagane.',
                      ]"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="currentDocument.receivedDate"
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
                      v-model="currentDocument.issueDate"
                      label="Data wystawienia"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="currentDocument.issueDate" locale="pl">
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
                      v-model="currentDocument.paymentDate"
                      label="Termin płatności"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="currentDocument.paymentDate"
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
                  v-model="currentDocument.invoiceNumber"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  :rules="[rules.required]"
                  label="Kategoria wydatku"
                  v-model="currentDocument.expenseCategory"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea
                  :rules="[rules.required]"
                  label="Uwagi do dokumentu"
                  rows="2"
                  v-model="currentDocument.invoiceComments"
                ></v-textarea>
              </v-col> </v-row
          ></v-container>
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Dane kontrahenta:
          </v-card-title>
          <Contractor v-model="currentDocument.contractor" />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Pozycje Kosztowe::
          </v-card-title>
          <Table v-model="currentDocument" />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
      
          <AddDocument v-model="currentDocument" :path="currentDocument.path" :objectTypeId="objectTypeId" :disabled='true' title="Faktura"/>
          <AddDocument v-model="currentDocument" :path="currentDocument.path" :objectTypeId="objectTypeId" title="Załączniki" />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Dalsze działanie:
          </v-card-title>
          <v-row justify="space-around">
            <v-radio-group v-model="status" :mandatory="true" row>
              <v-radio label="Koniec procesowania"></v-radio>
              <v-radio label="Wysyłam do akceptacji"></v-radio>
              <v-radio label="Wysyłam do konsultacji"></v-radio>
            </v-radio-group>

            <v-combobox
              :items="cons"
              item-text="fullName"
              label="dział odpowiedzialny"
            ></v-combobox>
          </v-row>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe
          provident, ab accusantium sunt totam delectus molestiae illo modi
          quasi quis tempora suscipit fuga tenetur repellendus magnam quam
          excepturi optio?</v-card
        >
        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Komentarze:
          </v-card-title>
          <CommentsSection
            :commentsList="currentDocument.comment.items"
            :caseId="currentDocument.mrcCaseHeader.caseId"
          />
        </v-card>
      </v-sheet>
    </v-card-text>
    <v-btn color="success" @click="submit()">Wyślij</v-btn>
  </v-form>
</template>

<script>
import Table from "./Table";
import AddDocument from "./AddDocument";
import Contractor from "./Contractor";
import CommentsSection from "./CommentsSection";

export default {
  name: "Document",
  
  components: {
    CommentsSection,
    Table,
    Contractor,
    AddDocument
  },
  props: { value: Object },

  data: () => ({
    currentDocument: {
      documentContent: {
        items: [],
      },
      comment: {
        items: [],
      },
      mrcCaseHeader: {},
    },
    menu1: false,
    menu2: false,
    menu3: false,
    modal: false,
    formHasErrors: false,
    rules: {
      required: (val) => !!val || "Pole jest wymagane.",
    },
    status: "Koniec procesowania",
    cons: [],
    objectTypeId: 'cmis:document',
  }),
  beforeMount() {
    this.getCons();
  },
  watch: {
    value(val) {
      this.currentDocument = val;
    },
    currentDocument: {
      handler() {
            this.$emit('input', this.currentDocument)
      },
      deep: true
   },
  },
  methods: {
    async getCons() {
      try {
        let result = await this.sendAjaxWithParams(this.appUrls.getCons, {});
        this.cons = result.result.items;
        console.log(this.cons);
      } catch (e) {
        console.log("error", e);
      }
    },

  //   submit() {
  //     this.formHasErrors = false;
  //     Object.keys(this.form.documentObject).forEach((f) => {
  //       if (!this.form.documentObject[f]) this.formHasErrors = true;
  //       this.$refs.form.validate();
  //     });
  //   },
  // },
  // computed: {
  //   form() {
  //     return {
  //       documentObject: {
  //         receivedDate: this.receivedDate,
  //         issueDate: this.issueDate,
  //         paymentDate: this.paymentDate,
  //         invoiceNumber: this.invoiceNumber,
  //         expenseCategory: this.expenseCategory,
  //         invoiceComments: this.invoiceComments,
  //       },
  //     };
  //   },
  },
};
</script>
