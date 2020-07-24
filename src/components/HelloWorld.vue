<template>
  <v-container>
    <p>cena: {{ singlePrice }}</p>
    <p>vat: {{ vatValue }}</p>
    <p>ilość: {{ amount }}</p>
    <p>suma netto: {{ totalPriceNetto }}</p>
    <p>suma vat: {{ totalVatValue }}</p>
    <p>suma brutto: {{ totalPriceBrutto }}</p>
    <v-row width="1200" justify="center">
      <v-simple-table>
        <template v-slot:top>
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
            >dodaj pozycję</v-btn
          >
        </template>

        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">numer</th>
              <th class="text-left">nazwa</th>
              <th class="text-left">cena</th>
              <th class="text-left">VAT (%)</th>
              <th class="text-left">ilość</th>
              <th class="text-left">cena całkowita netto</th>
              <th class="text-left">wartość VAT</th>
              <th class="text-left">cena całkowita brutto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ number }}</td>
              <td>{{ name }}</td>
              <td>{{ singlePrice }}</td>
              <td>{{ vatValue }}</td>
              <td>{{ amount }}</td>
              <td>{{ totalPriceNetto }}</td>
              <td>{{ totalVatValue }}</td>
              <td>{{ totalPriceBrutto }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    number: 1,
    name: "ołówki",
    singlePrice: 1.81,
    amount: 4,
    vatValue: 23,
  }),
  computed: {
    totalPriceNetto: function() {
      return this.singlePrice * this.amount;
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
};
</script>
