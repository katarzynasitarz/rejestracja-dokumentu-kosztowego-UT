<template>
  <li>
    <v-row justify="center" cols="9">
      <v-col>{{ position.name }}</v-col>
      <v-col>{{ position.department }}</v-col>
      <v-col>{{ position.price }} zł</v-col>
      <v-col>{{ position.vat }} %</v-col>
      <v-col>{{ position.amount }}</v-col>
      <v-col>{{ position.totalPriceNetto }} zł</v-col>
      <v-col>{{ position.totalVatValue }} zł</v-col>
      <v-col>{{ position.totalPriceBrutto }} zł</v-col>
      <v-col>
        <v-icon small @click="$emit('remove', position.number)">
          mdi-delete
        </v-icon>
      </v-col>
    </v-row>
    <!-- <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">numer</th> -->
    <!-- <th class="text-left">nazwa</th>
            <th class="textleft">dział odpowiedzialny</th>
            <th class="text-left">cena</th>
            <th class="text-left">VAT (%)</th>
            <th class="text-left">ilość</th>
            <th class="text-left">cena całkowita netto</th>
            <th class="text-left">wartość VAT</th>
            <th class="text-left">cena całkowita brutto</th>
            <th class="text-left">usuń</th> -->
    <!-- </tr>
        </thead>
        <tbody>
          <tr> -->
    <!-- <td>{{ position.number }}</td> -->
    <!-- <td>{{ position.name }}</td>
            <td>{{ position.department }}</td>
            <td>{{ position.price }}</td>
            <td>{{ position.vat }}</td>
            <td>{{ position.amount }}</td>
            <td>{{ position.totalPriceNetto }}</td>
            <td>{{ position.totalVatValue }}</td>
            <td>{{ position.totalPriceBrutto }}</td>
            <td>
              <v-icon small @click="$emit('remove', position.number)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
  </li>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
};
</script>
