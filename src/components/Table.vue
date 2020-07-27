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
              <v-text-field label="nazwa" v-model="position.name">{{
                position.name
              }}</v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="dział odpowiedzialny"
                v-model="position.department"
                >{{ position.department }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="cena jednostkowa netto"
                v-model="position.price"
                >{{ position.price }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="VAT %"
                v-model="position.vat"
                >{{ position.vat }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="ilość"
                v-model="position.amount"
                >{{ position.amount }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość netto"
                v-model="position.totalPriceNetto"
                >{{ position.totalPriceNetto }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość VAT"
                v-model="position.totalVatValue"
                >{{ position.totalVatValue }}</v-text-field
              >
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                label="wartość brutto"
                v-model="position.totalPriceBrutto"
                >{{ position.totalPriceBrutto }}</v-text-field
              >
            </v-col>
          </v-row>

          <v-btn rounded color="primary" dark @click="addPosition"
            >Dodaj kolejną pozycję</v-btn
          >
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
    TotalPriceNetto() {
      const position = this.position;
      position.totalPriceNetto = position.singlePrice * position.amount;
      return position.totalPriceNetto;
    },
    totalVatValue: function() {
      return (
        Math.round(((this.totalPriceNetto * this.vatValue) / 100) * 100) / 100
      );
    },
    totalPriceBrutto: function() {
      return this.totalPriceNetto + this.totalVatValue;
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
      console.log(position.totalPriceNetto);
      this.position.name = "";
      this.position.amount = "";
    },
    removePosition(numberToRemove) {
      this.positionList = this.positionList.filter((position) => {
        return position.number !== numberToRemove;
      });
    },
  },
};
</script>
