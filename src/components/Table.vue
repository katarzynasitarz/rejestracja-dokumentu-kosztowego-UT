<template>
  <v-container>
    <v-row>
      <v-card outlined>
        <v-card-title>
          Pozycje kosztowe:
        </v-card-title>
        <form ref="form" lazy-validation>
          <v-row class="table">
            <v-col>
              <v-text-field
                label="nazwa"
                v-model="position.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-combobox
                v-model="position.department"
                :items="teams"
                label="dział odpowiedzialny"
              ></v-combobox>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="cena jednostkowa netto"
                v-model="position.price"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="ilość"
                v-model="position.amount"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="VAT %"
                v-model="position.vat"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość netto"
                v-model="position.totalPriceNetto"
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość VAT"
                v-model="position.totalVatValue"
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość brutto"
                v-model="position.totalPriceBrutto"
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
            <ol>
              <PositionItem
                v-for="position in positionList"
                :key="position.number"
                :positionList="PositionList"
                :position="position"
                @remove="removePosition"
              />
            </ol>
            <v-row class="total" :align="alignment" :justify="justify">
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
        </form>
      </v-card>
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
    position: {},
    teams: [],
    positionList: [],
    sumNetto: null,
    sumVat: null,
    sumBrutto: null,
  }),
  beforeMount() {
    this.getTeams();
  },
  watch: {
    position: {
      handler: function() {
        const position = this.position;
        position.totalPriceNetto =
          Math.round(position.price * position.amount * 100) / 100;
        if (position.totalPriceNetto === 0) {
          position.totalPriceNetto = null;
        }
        if (position.vat < 10) {
          position.totalVatValue =
            Math.round(
              ((position.totalPriceNetto * position.vat) / 1000) * 100
            ) / 100;
        } else {
          position.totalVatValue =
            Math.round(
              ((position.totalPriceNetto * position.vat) / 100) * 100
            ) / 100;
        }
        if (position.totalVatValue === 0) {
          position.totalVatValue = null;
        }
        position.totalPriceBrutto =
          Math.round(
            (this.position.totalPriceNetto + this.position.totalVatValue) * 100
          ) / 100;
        if (position.totalPriceBrutto === 0) {
          position.totalPriceBrutto = null;
        }
      },

      deep: true,
    },
    positionList: function() {
      const positionList = this.positionList;
      this.sumNetto =
        Math.round(
          positionList.reduce((a, b) => a + b.totalPriceNetto, 0) * 100
        ) / 100;
      this.sumVat =
        Math.round(
          positionList.reduce((a, b) => a + b.totalVatValue, 0) * 100
        ) / 100;
      this.sumBrutto =
        Math.round(
          positionList.reduce((a, b) => a + b.totalPriceBrutto, 0) * 100
        ) / 100;
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

    addPosition() {
      const position = this.position;
      this.positionList.push({
        number: nextPositionNumber++,
        name: position.name,
        department: position.department,
        price: position.price,
        vat: position.vat,
        amount: position.amount,
        totalPriceNetto: position.totalPriceNetto,
        totalVatValue: position.totalVatValue,
        totalPriceBrutto: position.totalPriceBrutto,
      });
      console.log(this.positionList);
      console.log(JSON.parse(JSON.stringify(position)));
      console.log(JSON.parse(JSON.stringify(position.totalPriceNetto)));
      this.position.name = "";
      this.position.amount = null;
      this.position.price = null;
      this.position.vat = null;
      this.position.department = "";
      this.totalPriceNetto = null;
      this.totalVatValue = null;
      this.totalPriceBrutto = null;
    },

    removePosition(numberToRemove) {
      this.positionList = this.positionList.filter((position) => {
        return position.number !== numberToRemove;
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
</style>
