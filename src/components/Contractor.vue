<template>
<v-container>
     <v-card-text 
     class="headline 
     font-weight-bold" align="center"
     width="850">
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
            type= "number"
            :rules="nipRules"
            :counter="10"
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
            color="dark grey"
            class="mr-4"
            @click="reset"
            dark
            >
            Wyczyść</v-btn>

            <v-btn
            color="cyan"
            @click="getContractor"
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
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Należy wprowadzić nazwę firmy',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Należy wprowadzić e-mail firmy',
        v => /.+@.+\..+/.test(v) || 'Pamiętaj, e-mail ma swoją strukturę',
      ],
      adres: '',
      adresRules: [
      v => !!v || 'Adres firmy jest wymagany',
      ],
      nip: '',
      nipRules: [
        v => !!v || 'Proszę wprowadzić NIP firmy',
        v => (v && v.length == 10) || 'NIP musi zawierać 10 cyfr',
      ],
  }),
  
  methods: {
    reset () {
        this.$refs.form.reset()
      },
    async getContractor() {
      try {
        let result = await this.sendAjaxWithParams(this.appUrls.getContractor, {});
        this.contractor = result.result.items;
      console.log(this.contractor);
      } catch (e) {
        console.log("error", e);
      }
    },
    },
};
</script>