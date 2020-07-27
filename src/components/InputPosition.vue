<template>
  <v-text-field type="text" :value="name" v-on="listeners">{{
    position.name
  }}</v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: (event) => this.$emit("input", event.target.value),
      };
    },
  },
};
</script>
