<template>
<v-container>
     <v-card-text class="headline font-weight-bold" align="center">
         Dodaj kontrahenta
    </v-card-text>

    <v-row width="850" 
            justify="center">
          
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

            <v-text-field
            
            v-model="name"
            :rules="nameRules"
            label="Nazwa firmy"
            required
            ></v-text-field>

            <v-text-field
            v-model="adres"
            :rules="adresRules"
            label="Adres firmy"
            required
            ></v-text-field>

             <v-text-field
            v-model="nip"
            :rules="nipRules"
            label="NIP firmy"
            required
            ></v-text-field>

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail firmy"
            required
            ></v-text-field>

            <v-btn
            :disabled="!valid"
            color="pink"
            class="mr-4"
            @click="validate"
            >
            Sprawdź czy istnieje
            </v-btn>

            <v-btn
            color="teal"
            class="mr-4"
            @click="reset"
            dark
            >
            Wyczyść
            </v-btn>

            <v-btn
            color="cyan"
            @click="resetValidation"
            dark
            >
            Zapisz
            </v-btn>
  </v-form>
      </v-row>

  </v-container>
</template>

<script>
export default {
  name: "Contractor",

  data: () => ({
  }),

};
</script>
