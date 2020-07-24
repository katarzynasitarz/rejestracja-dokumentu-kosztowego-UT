<template>
  <v-container>
    <v-card-text class="headline font-weight-bold" align="center">
      Przykładowa tabelka
    </v-card-text>

    <v-row width="1200" justify="center">
      <v-data-table
        :headers="headers"
        :items="documents"
        hide-default-footer="true"
        class="elevation-1 pa-4"
      >
      </v-data-table>
    </v-row>
    <v-row width="1200" justify="center">
      <p>{{ singlePrice }}</p>
      <p>{{ vatValue }}</p>
      <p>{{ amount }}</p>
      <p>{{ totalPriceNetto }}</p>
      <p>{{ totalPriceBrutto }}</p>
      <p>{{ totalVatValue }}</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      singlePrice: 1.99,
      amount: 4,
      vatValue: 23,

      function() {
        return {
          totalPriceNetto: Math.evaluate(this.singlePrice * this.amount),
        };
      },

      headers: [
        {
          text: "nazwa pozycji kosztowej",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "cena jednostkowa netto", value: "price" },
        { text: "ilość", value: "amount" },
        { text: "VAT (%)", value: "vat" },
        { text: "dział odpowiedzialny", value: "departament" },
        { text: "cena netto", value: "totalPriceNetto" },
        { text: "wartość VAT", value: "totalVatValue" },
        { text: "cena brutto", value: "totalPriceBrutto" },
      ],
      documents: [
        {
          name: "ołówki",
          price: 1.5,
          amount: 3,
          vat: 23,
          departament: "kadry",
          totalPriceNetto: 3.69,
          totalVatValue: 0.85,
          totalPriceBrutto: 4.54,
        },
        {
          name: "ołówki",
          price: 1.29,
          amount: 3,
          vat: 23,
          departament: "kadry",
          totalPriceNetto: 3.69,
          totalVatValue: 0.85,
          totalPriceBrutto: 4.54,
        },
      ],
    };
  },
};
</script>
