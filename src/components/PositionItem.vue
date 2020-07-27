<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">numer</th>
          <th class="text-left">nazwa</th>
          <th class="textleft">dział odpowiedzialny</th>
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
          <td>{{ position.number }}</td>
          <td>{{ position.name }}</td>
          <td>{{ position.department }}</td>
          <td>{{ position.price }}</td>
          <td>{{ position.vat }}</td>
          <td>{{ position.amount }}</td>
          <td>{{ position.totalPriceNetto }}</td>
          <td>{{ position.totalVatValue }}</td>
          <td>{{ position.totalPriceBrutto }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <!-- <li>
    <v-row v-model="position">
      <v-col>
        {{ position.name }}
      </v-col>
      <v-col>
        {{ position.amount }}
      </v-col>
    </v-row>
    <button @click="$emit('remove', position.number)">
      X
    </button>
  </li> -->
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
