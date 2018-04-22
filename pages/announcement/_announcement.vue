<template>
  <v-container class="markdown-body">
    <h1>{{ title }}</h1>
    <img v-if="$data.thumbnail" :src="thumbnail" :alt="title">
    <div v-if="$data.body" v-html="$marked($data.body)" class="body-1" />
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
      return await import(`~/content/blog/posts/announcements/${
        params.announcement
      }.json`);
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found.' });
    }
  },
};
</script>
