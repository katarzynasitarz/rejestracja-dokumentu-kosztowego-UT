<template>
  <v-container>
    <v-row>
      <v-form ref="form">
        <v-row class="table">
          <v-col>
            <v-text-field
              label="nazwa"
              v-model="documentContent.itemName"
              :rules="nameRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-combobox
              v-model="documentContent.department"
              :items="teams"
              label="dział odpowiedzialny"
              :rules="teamsRules"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="cena jednostkowa netto"
              v-model="documentContent.unitPrice"
              suffix="zł"
              :rules="priceRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="ilość"
              v-model="documentContent.itemQuantity"
              :rules="amountRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="VAT %"
              v-model="documentContent.vat"
              :rules="vatRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="wartość netto"
              v-model="documentContent.netto"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="wartość VAT"
              v-model="documentContent.vatValue"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              label="wartość brutto"
              v-model="documentContent.brutto"
              suffix="zł"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="button">
          <v-btn x-small tile depressed color="cyan" dark @click="addPosition"
            >Dodaj pozycję</v-btn
          >
        </v-row>
        <div class="results" v-if="positionList.length">
          <v-row class="header" :justify="justify" cols="9">
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
          <ol>
            <PositionItem
              v-for="documentContent in positionList"
              :key="documentContent.number"
              :documentContent="documentContent"
              @remove="removePosition"
            />
          </ol>
          <v-row class="total">
            <v-col>
              <p>razem:</p>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                label="suma netto"
                type="number"
                v-model="sumNetto"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                label="suma VAT"
                type="number"
                v-model="sumVat"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="2">
              <v-text-field
                label="suma brutto"
                type="number"
                v-model="sumBrutto"
                suffix="zł"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-row class="valid" v-else>
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

  components: {
    PositionItem,
  },

  data: () => ({
    documentContent: {},
    teams: [],
    positionList: [],
    sumNetto: null,
    sumVat: null,
    sumBrutto: null,
    nameRules: [(v) => !!v || "To pole jest obowiązkowe"],
    teamsRules: [(v) => !!v || "To pole jest obowiązkowe"],
    priceRules: [(v) => !!v || "To pole jest obowiązkowe"],
    amountRules: [(v) => !!v || "To pole jest obowiązkowe"],
    vatRules: [(v) => !!v || "To pole jest obowiązkowe"],
    justify: "center",
  }),
  beforeMount() {
    this.getTeams();
  },
  watch: {
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
    positionList: function() {
      const positionList = this.positionList;
      this.sumNetto =
        Math.round(positionList.reduce((a, b) => a + b.netto, 0) * 100) / 100;
      this.sumVat =
        Math.round(positionList.reduce((a, b) => a + b.vatValue, 0) * 100) /
        100;
      this.sumBrutto =
        Math.round(positionList.reduce((a, b) => a + b.brutto, 0) * 100) / 100;
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
        this.positionList.push({
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
        // console.log(this.positionList);
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
      this.positionList = this.positionList.filter((documentContent) => {
        return documentContent.number !== numberToRemove;
      });
    },
  },
};
</script>

<style lang="scss">
.table {
  padding: 0 15px;
}
.button {
  padding: 0 30px 15px;
  justify-content: end;
}
.results {
  padding: 0 15px;
}
.valid {
  color: red;
  padding: 0 30px;
}
.total p {
  text-align: right;
}
.header {
  // text-align: center;
  font-size: smaller;
  border-bottom: 1px solid #000;
}
</style>
