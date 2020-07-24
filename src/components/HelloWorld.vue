<template>
  <v-container>
    <p>cena: {{ singlePrice }}</p>
    <p>vat: {{ vatValue }}</p>
    <p>ilość: {{ amount }}</p>
    <p>suma netto: {{ totalPriceNetto }}</p>
    <p>suma vat: {{ totalVatValue }}</p>
    <p>suma brutto: {{ totalPriceBrutto }}</p>
    <v-row width="1200" justify="center">
      <v-card-text class="headline font-weight-bold" align="center">
        Prosta tabelka
      </v-card-text>
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
    <v-row width="1200" justify="center">
      <v-card-text class="headline font-weight-bold" align="center">
        Skomplikowana tabelka
      </v-card-text>
      <v-data-table
        :headers="headers"
        :items="documents"
        hide-default-footer="true"
        class="elevation-1 pa-4"
      >
      </v-data-table>
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

    headers: [
      { text: "numer", align: "start", value: "number" },
      { text: "nazwa pozycji kosztowej", value: "name" },
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
        number: 1,
        name: "ołówki",
        price: 1.5,
        amount: 3,
        vat: 23,
        departament: "kadry",
        totalPriceNetto: "",
        totalVatValue: "",
        totalPriceBrutto: "",
      },
    ],
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
