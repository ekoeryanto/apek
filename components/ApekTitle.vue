<template>
  <div class="bgx mb-3">
    <v-container>
      <h1 class="white--text py-4">{{ title }}</h1>
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
  },
};
</script>
