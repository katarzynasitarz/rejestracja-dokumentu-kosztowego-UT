<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in 5" :key="i">
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CommentsSection",
  props: {
    commentsList: Array,
  },
  data: () => ({}),

  beforeMount() {
    this.getComments();
    console.log(this.commentsList);
  },

  methods: {
    async getComments() {
      try {
        let result = await this.sendAjaxWithParams(
          this.appUrls.getComments,
          {}
        );
        this.comments = result.result.items;
        // console.log(this.comments);
        this.mapAjaxDataToList(this.comments);
      } catch (e) {
        console.log("error", e);
      }
    },
    mapAjaxDataToList(list) {
      // lista komentarzy z ajaxa
      // console.log(list);
      list.forEach((el) => {
        this.commentsList.push(el);
      });
      console.log(this.commentsList, "LISTA");
    },
  },
};
</script>
