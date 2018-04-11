<template>
  <v-container>
    <h1>{{ title }}</h1>
    <h2>{{ address }}</h2>
    <div v-if="$data.body" v-html="$marked($data.body)" class="markdown-body body-1 color-inherit" />
  </v-container>
</template>

<script>
export default {
  async asyncData({ params }) {
    let member = await import('~/content/members/' + params.slug + '.json');
    return member;
  },
};
</script>
