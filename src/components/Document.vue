<template>
  <v-form>
    <v-card-text class="grey lighten-4">
      <v-sheet width="800" height="1000" class="mx-auto pa-8">
        <v-card-title class="justify-center py-10">
          <h1>Rejestracja dokumentu - 11223345</h1>
        </v-card-title>
        <v-container>
          <v-card-title>Dane dokumentu:</v-card-title>
          <v-card outlined class="px-6">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Data wpłynięcia"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Data wystawienia"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Termin płatności"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Nr faktury"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Kategoria wydatku"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea label="Uwagi do dokumentu" rows="2"></v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
        <v-container>
          <v-card-title>Dane kontrahenta:</v-card-title>
          <v-card outlined class="px-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            exercitationem laudantium laborum non saepe quidem ex doloribus,
            fugit placeat natus dolorum! Cumque ab voluptates quasi pariatur
            perspiciatis labore voluptatem iste.</v-card
          >
        </v-container>
        <v-container>
          <v-card-title>Dane faktury:</v-card-title>
          <v-card outlined class="px-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            exercitationem laudantium laborum non saepe quidem ex doloribus,
            fugit placeat natus dolorum! Cumque ab voluptates quasi pariatur
            perspiciatis labore voluptatem iste.</v-card
          >
        </v-container>
      </v-sheet>
    </v-card-text>
  </v-form>
</template>

<script>
export default {
  name: "Document",

  data: () => ({}),
  methods: {},
};
</script>
