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
    <!-- <v-btn @click="saveComment()">Dodaj komentarz</v-btn> -->

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
                  v-model="commentAuthor"
                  label="Autor"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="commentDateAdded"
                  label="Data dodania"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="commentprocessStep"
                  label="Etap procesu"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="commentText"
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
  },
  data: () => ({
    dialog: false,
    commentText: "",
    commentAuthor: "",
    commentDateAdded: "",
    commentprocessStep: "",
  }),

  beforeMount() {
    this.getComments();
  },

  methods: {
    close() {
      this.dialog = false;
      // this.commentText = "";
      // this.commentAuthor = "";
      // this.commentDateAdded = "";
      // this.commentprocessStep = "";
    },

    save() {
      this.commentsList.push({
        text: this.commentText,
        author: this.commentAuthor,
        dateAdded: this.commentDateAdded,
        processStep: this.commentprocessStep,
      });
      this.close();
      console.log(this.commentsList);
      this.saveComment(this.commentsList);
    },

    async getComments() {
      try {
        let result = await this.sendAjaxWithParams(
          this.appUrls.getComments,
          {}
        );
        this.comments = result.result.items;
        this.comments.forEach((comment) => {
          this.commentsList.push(comment);
        });
      } catch (e) {
        console.log("error", e);
      }
    },

    async saveComment(list) {
      console.log(list[list.length - 1]);
      let params = list[list.length - 1];

      try {
        let result = await this.sendAjaxWithParams(
          this.appUrls.saveComments,
          params
        );
        console.log(result);
        this.clearData();
        this.getComments();
      } catch (e) {
        console.log(e, "error");
      }
    },
  },
};
</script>
