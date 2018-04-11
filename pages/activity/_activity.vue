<template>
  <article>
    <h1>{{ title }}</h1>
    <img v-if="$data.thumbnail" :src="thumbnail" :alt="title">
    <div v-html="$marked(body)" class="markdown-body" />
  </article>
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
      return await import(`~/content/blog/posts/activities/${
        params.activity
      }.json`);
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found.' });
    }
  },
};
</script>
