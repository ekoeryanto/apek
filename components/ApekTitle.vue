<template>
  <div class="bgx mb-3">
    <v-container class="py-5">
      <h1 class="white--text headline">{{ title }}</h1>
      <span
        v-if="subtitle"
        class="subheading white--text"
        v-text="subtitle"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>
