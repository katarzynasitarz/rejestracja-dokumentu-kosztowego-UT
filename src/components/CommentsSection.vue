<template>
  <v-form ref="form" v-model="valid">
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in commentList" :key="i">
        <v-expansion-panel-header>Komentarz</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ item.text }}</p>
          <p>{{ item.author }}</p>
          <p>{{ item.dateAdded }}</p>
          <p>{{ item.processStep }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on"
            >Dodaj komentarz</v-btn
          >
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="comment.author"
                    label="Autor"
                    :rules="[(v) => !!v || 'Pole jest wymagane.']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="comment.dateAdded"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="comment.dateAdded"
                        label="Data dodania"
                        prepend-icon="mdi-calendar-clock"
                        :rules="[(v) => !!v || 'Pole jest wymagane.']"
                        readonly
                        clearable
                        v-on="on"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="comment.dateAdded" locale="pl">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="comment.processStep"
                    label="Etap procesu"
                    :rules="[(v) => !!v || 'Pole jest wymagane.']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="comment.text"
                    label="Komentarz"
                    :rules="[(v) => !!v || 'Pole jest wymagane.']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-expansion-panels>
  </v-form>
</template>

<script>
export default {
  name: "CommentsSection",
  props: {
    value: Array,
    caseId: String,
  },
  data: () => ({
    commentList: [],
    menu: false,
    dialog: false,
    modal: false,
    valid: true,
    comment: {
      text: "",
      author: "",
      dateAdded: new Date().toISOString().substr(0, 10),
      processStep: "",
    },
  }),

  watch: {
    value: {
      handler(val) {
        this.commentList = val;
      },
    },
    caseId() {
      if (this.caseId) {
        this.getComments();
      }
    },
  },
  // mounted() {
  //   this.getComments();
  // },
  methods: {
    close() {
      this.dialog = false;
      return this.$refs.form.reset();
    },

    save() {
      if (this.validate()) {
        this.saveComment(this.comment);
        this.close();
      }
    },
    validate() {
      return this.$refs.form.validate();
    },

    async getComments() {
      if (this.caseId) {
        let params = { caseId: this.caseId };
        try {
          let result = await this.sendAjaxWithParams(
            this.appUrls.getComments,
            params
          );
          this.commentList = result.comments.items;
          console.log(this.commentList);
          this.$emit("input", this.commentList);
        } catch (e) {
          console.log("error", e);
        }
      }
    },

    async saveComment(element) {
      let params = {
        comment: {
          text: element.text,
          author: element.author,
          dateAdded: element.dateAdded,
          processStep: element.processStep,
        },
        caseId: this.caseId,
      };
      try {
        await this.sendAjaxWithParams(this.appUrls.saveComment, params);
        this.getComments();
      } catch (e) {
        console.log(e, "error");
      }
    },
  },
};
</script>
