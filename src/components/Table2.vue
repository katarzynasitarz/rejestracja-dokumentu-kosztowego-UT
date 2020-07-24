<template>
  <v-data-table
    :headers="headers"
    :items="documentPositions"
    hide-default-footer="true"
    sort-by="calories"
    class="elevation-1 pa-4"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
            >Dodaj nową pozycję</v-btn
          >
        </template>
        <v-spacer></v-spacer>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.positionNumber"
                    label="Numer pozycji"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.quantity"
                    type="number"
                    label="Ilość"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.unitPrice"
                    type="number"
                    label="Cena jednostkowa"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.tax"
                    type="number"
                    label="Wysokość VAT"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    v-model="value"
                    :items="items"
                    label="Przypisany dział"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="netValue"
                    type="number"
                    label="całkowita wartość netto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="taxValue"
                    type="number"
                    label="całkowita wartość VAT"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="grossValue"
                    type="number"
                    label="całkowita wartość brutto"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Anuluj</v-btn>
            <v-btn color="blue darken-1" text @click="save">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetuj</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",
  data: () => ({
    dialog: false,
    value: null,
    values: [],
    items: ["Obrony", "Tajemnic", "Czarnej Magii"],
    headers: [
      {
        text: "Numer pozycji",
        align: "start",
        sortable: false,
        value: "positionNumber",
      },
      { text: "Ilość", value: "quantity" },
      { text: "Cena jednostkowa", value: "unitPrice" },
      { text: "Wysokość VAT (%)", value: "tax" },
      {
        text: "Przypisany dział",
        value: "department",
      },
      {
        text: "Sumaryczna wartość netto (zł)",
        value: "netValue",
        sortable: false,
      },
      {
        text: "Sumaryczna wartość brutto (zł)",
        value: "grossValue",
      },
      { text: "Wartość VAT (zł)", value: "taxValue" },
      { text: "Opcje", sortable: false, value: "actions" },
    ],
    documentPositions: [],
    editedIndex: -1,
    editedItem: {
      positionNumber: "",
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      department: [],
      netValue: 0,
      grossValue: 0,
      taxValue: 0,
    },
    defaultItem: {
      positionNumber: 1,
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      department: [],
      netValue: 0,
      grossValue: 0,
      taxValue: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nowa pozycja" : "Edytuj pozycję";
    },
    netValue: function() {
      return this.editedItem.unitPrice * this.editedItem.quantity;
    },
    taxValue: function() {
      return (
        Math.round(((this.netValue * this.editedItem.tax) / 100) * 100) / 100
      );
    },
    grossValue: function() {
      return (this.netValue + this.taxValue).toFixed(2);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.documentPositions = [
        {
          positionNumber: 1,
          quantity: 12,
          unitPrice: 1,
          tax: 5,
          department: "Obrony",
          netValue: 2,
          grossValue: 4,
          taxValue: 9,
        },
        {
          positionNumber: 2,
          quantity: 12,
          unitPrice: 1,
          tax: 5,
          department: "Obrony",
          netValue: 2,
          grossValue: 4,
          taxValue: 9,
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.documentPositions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.documentPositions.indexOf(item);
      confirm("Jesteś pewien, że chcesz usunąć tą pozycję?") &&
        this.documentPositions.splice(index, 1);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.documentPositions[this.editedIndex],
          this.editedItem
        );
      } else {
        this.documentPositions.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
