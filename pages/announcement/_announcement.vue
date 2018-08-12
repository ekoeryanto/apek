<template>
  <v-container class="markdown-body">
    <h1>{{ title }}</h1>
    <v-img v-if="$data.thumbnail" :src="thumbnail" :alt="title" contain max-height="460px" />
    <div v-if="$data.body" v-html="$marked($data.body)" class="body-1" />
  </v-container>
</template>

<script>
import { VImg } from 'vuetify';

export default {
  components: {
    VImg,
  },
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
