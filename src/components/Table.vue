<template>
  <v-container>
    <v-row>
      <v-form ref="form" lazy-validation>
        <v-row class="px-3">
          <v-col>
            <v-text-field
              v-model="documentContent.itemName"
              :rules="nameRules"
              hint="nazwa"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col>
            <v-combobox
              v-model="documentContent.department"
              :items="teams"
              item-text="name"
              hint="dział odpowiedzialny"
              persistent-hint
              :rules="teamsRules"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              hint="cena jednostkowa netto"
              persistent-hint
              v-model="documentContent.unitPrice"
              min="0,01"
              suffix="zł"
              :rules="priceRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              hint="ilość"
              persistent-hint
              min="1"
              v-model="documentContent.itemQuantity"
              :rules="amountRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="px-3">
          <v-col>
            <v-text-field
              type="number"
              hint="VAT %"
              persistent-hint
              min="0,01"
              v-model="documentContent.vat"
              :rules="vatRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              hint="wartość netto"
              persistent-hint
              v-model="documentContent.netto"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              hint="wartość VAT"
              persistent-hint
              v-model="documentContent.vatValue"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              hint="wartość brutto"
              persistent-hint
              v-model="documentContent.brutto"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-end pr-6">
          <v-btn small tile depressed color="cyan" dark @click="addPosition">
            <v-icon dark left small>mdi-plus</v-icon>Dodaj pozycję</v-btn
          >
        </v-row>

        <div
          class="results ma-2 "
          v-if="currentDocument.documentContent.items.length"
        >
          <v-row
            class="justify-space-between text-uppercase grey--text caption pl-6"
            cols="9"
          >
            <v-col>nazwa</v-col>
            <v-col>dział odpowiedzialny</v-col>
            <v-col>cena</v-col>
            <v-col>wysokość VAT</v-col>
            <v-col>ilość</v-col>
            <v-col>wartość netto</v-col>
            <v-col>wartość VAT</v-col>
            <v-col>wartość brutto</v-col>
            <v-col>
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-col>
          </v-row>
          <!-- <v-row class="justify-space-between"> -->
          <ol>
            <PositionItem
              v-for="documentContent in currentDocument.documentContent.items"
              :key="documentContent.number"
              :documentContent="documentContent"
              @remove="removePosition"
            />
          </ol>
          <!-- </v-row> -->
          <v-spacer></v-spacer>
          <v-row
            class="teal lighten-5 text-right font-weight-bold mx-0"
            align="stretch"
          >
            <v-col>
              <p class="text-uppercase">razem:</p>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                type="number"
                label="suma netto"
                v-model="currentDocument.sumNetto"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                type="number"
                label="suma VAT"
                v-model="currentDocument.sumVat"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                type="number"
                label="suma brutto"
                v-model="currentDocument.sumBrutto"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-row class="pl-6 red--text" v-else>
          <p>Dodaj przynajmniej jedną pozycję.</p>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import PositionItem from "./PositionItem.vue";

let nextPositionNumber = 1;

export default {
  name: "Table",

  props: ["value"],

  components: {
    PositionItem,
  },

  data: () => ({
    teams: [],
    documentContent: {},
    currentDocument: {
      documentContent: {
        items: [],
      },
      mrcCaseHeader: {},
    },
    items: [],
    sumNetto: null,
    sumVat: null,
    sumBrutto: null,

    nameRules: [(v) => !!v || "To pole jest obowiązkowe"],
    teamsRules: [(v) => !!v || "To pole jest obowiązkowe"],
    priceRules: [(v) => !!v || "To pole jest obowiązkowe"],
    amountRules: [(v) => !!v || "To pole jest obowiązkowe"],
    vatRules: [(v) => !!v || "To pole jest obowiązkowe"],
  }),
  beforeMount() {
    this.getTeams();
  },
  watch: {
    value: {
      handler(val) {
        this.currentDocument = val;
      },
    },
    documentContent: {
      handler: function() {
        const documentContent = this.documentContent;
        documentContent.netto =
          Math.round(
            documentContent.unitPrice * documentContent.itemQuantity * 100
          ) / 100;
        if (documentContent.netto === 0) {
          documentContent.netto = null;
        }
        if (documentContent.vat < 10) {
          documentContent.vatValue =
            Math.round(
              ((documentContent.netto * documentContent.vat) / 1000) * 100
            ) / 100;
        } else {
          documentContent.vatValue =
            Math.round(
              ((documentContent.netto * documentContent.vat) / 100) * 100
            ) / 100;
        }
        if (documentContent.vatValue === 0) {
          documentContent.vatValue = null;
        }
        documentContent.brutto =
          Math.round(
            (this.documentContent.netto + this.documentContent.vatValue) * 100
          ) / 100;
        if (documentContent.brutto === 0) {
          documentContent.brutto = null;
        }
      },

      deep: true,
    },
    "currentDocument.documentContent.items": function() {
      this.currentDocument.sumNetto =
        Math.round(
          this.currentDocument.documentContent.items.reduce(
            (a, b) => a + b.netto,
            0
          ) * 100
        ) / 100;
      this.currentDocument.sumVat =
        Math.round(
          this.currentDocument.documentContent.items.reduce(
            (a, b) => a + b.vatValue,
            0
          ) * 100
        ) / 100;
      this.currentDocument.sumBrutto =
        Math.round(
          this.currentDocument.documentContent.items.reduce(
            (a, b) => a + b.brutto,
            0
          ) * 100
        ) / 100;
      if (this.currentDocument.mrcCaseHeader.caseId) {
        // this.$emit("input", this.currentDocument);
      }
    },
  },
  computed: {},

  methods: {
    async getTeams() {
      try {
        let result = await this.sendAjaxWithParams(this.appUrls.getTeams, {});
        this.teams = result.result.items;
        console.log(this.teams);
      } catch (e) {
        console.log("error", e);
      }
    },

    validate() {
      return this.$refs.form.validate();
    },
    addPosition() {
      if (this.validate()) {
        const documentContent = this.documentContent;
        this.currentDocument.documentContent.items.push({
          number: nextPositionNumber++,
          itemName: documentContent.itemName,
          department: documentContent.department,
          unitPrice: documentContent.unitPrice,
          vat: documentContent.vat,
          itemQuantity: documentContent.itemQuantity,
          netto: documentContent.netto,
          vatValue: documentContent.vatValue,
          brutto: documentContent.brutto,
        });
        this.$refs.form.reset();

        // this.$emit("input", this.currentDocument);
        console.log(this.currentDocument);
        // console.log(this.sumNetto);
        // console.log(JSON.parse(JSON.stringify(position)));
        // console.log(JSON.parse(JSON.stringify(position.totalPriceNetto)));
        this.documentContent.itemName = "";
        this.documentContent.itemQuantity = null;
        this.documentContent.unitPrice = null;
        this.documentContent.vat = null;
        this.documentContent.department = "";
        this.netto = null;
        this.vatValue = null;
        this.brutto = null;
      }
    },

    removePosition(numberToRemove) {
      this.currentDocument.documentContent.items = this.currentDocument.documentContent.items.filter(
        (documentContent) => {
          return documentContent.number !== numberToRemove;
        }
      );
    },
  },
};
</script>
