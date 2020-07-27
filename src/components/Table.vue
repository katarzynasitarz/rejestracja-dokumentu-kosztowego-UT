<template>
  <v-container>
    <v-row>
      <v-card outlined>
        <v-card-title>
          Pozycje kosztowe:
        </v-card-title>
        <div>
          <v-row>
            <v-col>
              <v-text-field
                label="nazwa"
                v-model="position.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="dział odpowiedzialny"
                v-model="position.department"
              ></v-text-field>
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
                v-model="totalPriceNetto"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość VAT"
                v-model="totalVatValue"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość brutto"
                v-model="totalPriceBrutto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn color="cyan" dark @click="addPosition">Dodaj pozycję</v-btn>

          <div v-if="positionList.length">
            <PositionItem
              v-for="position in positionList"
              :key="position.number"
              :position="position"
              @remove="removePosition"
            />
          </div>
          <p v-else>Dodaj przynajmniej jedną pozycję.</p>
        </div>
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

    positionList: [],
  }),
  watch: {},
  computed: {
    totalPriceNetto: {
      get: function() {
        const position = this.position;
        position.totalPriceNetto =
          Math.round(position.price * position.amount * 100) / 100;
        if (position.totalPriceNetto === 0) {
          position.totalPriceNetto = null;
        }
        return position.totalPriceNetto;
      },
      set: function() {},
    },

    totalVatValue: {
      get: function() {
        const position = this.position;
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
        return position.totalVatValue;
      },
      set: function() {},
    },

    totalPriceBrutto: {
      get: function() {
        const position = this.position;
        position.totalPriceBrutto =
          Math.round(
            (position.totalPriceNetto + position.totalVatValue) * 100
          ) / 100;
        if (position.totalPriceBrutto === 0) {
          position.totalPriceBrutto = null;
        }
        return position.totalPriceBrutto;
      },
      set: function() {},
    },
  },

  methods: {
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
