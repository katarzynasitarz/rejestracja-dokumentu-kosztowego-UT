<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in commentsList" :key="i">
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
                  v-model="comment.commentAuthor"
                  label="Autor"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="comment.commentDateAdded"
                      label="Data dodania"
                      prepend-icon="mdi-calendar-clock"
                      readonly
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="comment.commentDateAdded" locale="pl">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="comment.commentprocessStep"
                  label="Etap procesu"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="comment.commentText"
                  label="Komentarz"
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
</template>

<script>
export default {
  name: "CommentsSection",
  props: {
    commentsList: Array,
    caseId: String,
  },
  data: () => ({
    menu: false,
    dialog: false,
    modal: false,
    comment: {
      commentText: "",
      commentAuthor: "",
      commentDateAdded: new Date().toISOString().substr(0, 10),
      commentprocessStep: "",
    },
  }),

  beforeMount() {
    this.getComments();
  },

  methods: {
    close() {
      this.dialog = false;
    },

    save() {
      this.saveComment(this.comment);
      this.close();
    },

    async getComments() {
      let params = { caseId: this.caseId };
      try {
        let result = await this.sendAjaxWithParams(
          this.appUrls.getComments,
          params
        );
        this.comments = result.comments.items;
        this.commentsList = this.comments;
        // this.comments.forEach((comment) => {
        //   this.commentsList.push(comment);
        // });
        console.log(this.commentsList);
      } catch (e) {
        console.log("error", e);
      }
    },

    async saveComment(element) {
      let params = {
        comment: {
          text: element.commentText,
          author: element.commentAuthor,
          dateAdded: element.commentDateAdded,
          processStep: element.commentprocessStep,
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
