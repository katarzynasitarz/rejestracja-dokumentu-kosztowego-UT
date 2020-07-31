<template>
  <li>
    <v-row cols="9" class="body-2 justify-center">
      <v-col>{{ documentContent.itemName }}</v-col>
      <v-col>{{ documentContent.department.name }}</v-col>
      <v-col>{{ documentContent.unitPrice }} zł</v-col>
      <v-col>{{ documentContent.vat }} %</v-col>
      <v-col>{{ documentContent.itemQuantity }}</v-col>
      <v-col>{{ documentContent.netto }} zł</v-col>
      <v-col>{{ documentContent.vatValue }} zł</v-col>
      <v-col>{{ documentContent.brutto }} zł</v-col>
      <v-col>
        <v-icon small @click="$emit('remove', documentContent.number)">
          mdi-delete
        </v-icon>
      </v-col>
    </v-row>
  </li>
</template>

<script>
export default {
  props: {
    documentContent: {
      type: Object,
      required: true,
    },
  },
};
</script>
