<template>
  <v-container>
    <h1>{{ title }}</h1>
    <img v-if="$data.thumbnail" :src="thumbnail" :alt="title">
    <div v-if="$data.body" v-html="$marked($data.body)" class="markdown-body body-1 color-inherit" />
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
    };
  },
  async asyncData({ params, error }) {
    try {
      return await import(`~/content/blog/posts/technologies/${
        params.technology
      }.json`);
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found.' });
    }
  },
};
</script>
