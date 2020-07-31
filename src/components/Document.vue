<template>
  <v-form ref="form" lazy-validation>
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
                      :rules="[(v) => !!v || 'Pole jest wymagane.']"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                      validate-on-blur
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="currentDocument.receivedDate"
                    locale="pl"
                    validate-on-blur
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
                      validate-on-blur
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="currentDocument.issueDate"
                    locale="pl"
                    validate-on-blur
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
                      :rules="[rules.required]"
                      v-model="currentDocument.paymentDate"
                      label="Termin płatności"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                      validate-on-blur
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="currentDocument.paymentDate"
                    locale="pl"
                    validate-on-blur
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
                  validate-on-blur
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  :rules="[rules.required]"
                  label="Kategoria wydatku"
                  v-model="currentDocument.expenseCategory"
                  validate-on-blur
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea
                  :rules="[rules.required]"
                  label="Uwagi do dokumentu"
                  rows="2"
                  v-model="currentDocument.invoiceComments"
                  validate-on-blur
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
            Pozycje Kosztowe:
          </v-card-title>
          <Table v-model="currentDocument" />
        </v-card>

        <v-card outlined class="mx-6 mb-6">
          <AddDocument
            v-model="currentDocument.items"
            :path="currentDocument.path"
            :objectTypeId="objectTypeId"
            :disabled="true"
            title="Faktura"
          />
          <AddDocument
            v-model="currentDocument.items"
            :path="currentDocument.path"
            :objectTypeId="objectTypeId"
            title="Załączniki"
          />
        </v-card>

        <v-card outlined class="mx-6 mb-6" style="padding: 10px 20px">
          <h3>Czy wysłać do konsultacji?</h3>
          <v-checkbox
            v-model="isConsulted"
            label="Wyślij do konsultacji."
          ></v-checkbox>

          <v-combobox
            :items="cons"
            item-text="name"
            label="Konsultant"
          ></v-combobox>
        </v-card>
        <v-card outlined class="mx-6 mb-6">
          <v-card-title class="font-weight-bold">
            Komentarze:
          </v-card-title>
          <CommentsSection
            v-model="currentDocument.comment.items"
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
    AddDocument,
  },
  props: { value: Object },

  data: () => ({
    currentDocument: {
      receivedDate: new Date().toISOString().substr(0, 10),
      issueDate: new Date().toISOString().substr(0, 10),
      paymentDate: new Date().toISOString().substr(0, 10),
      documentContent: {
        items: [],
      },
      comment: {
        items: [],
      },
      mrcCaseHeader: {},
      items: [],
    },
    menu1: false,
    menu2: false,
    menu3: false,
    modal: false,
    formHasErrors: false,
    rules: {
      required: (val) => !!val || "Pole jest wymagane.",
    },

    isConsulted: true,

    cons: [],
    objectTypeId: "cmis:document",
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
        // this.$emit("input", this.currentDocument);
      },
      deep: true,
    },
  },
  mounted() {
    this.currentDocument = this.value;
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

    submit() {
      if (this.$refs.form.validate()) {
        console.log("NO ELO");
      }
    },
  },
};
</script>
