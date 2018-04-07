<template>
  <v-container>
    <h1>{{ title }}</h1>
    <img v-if="$data.thumbnail" :src="thumbnail" :alt="title">
    <div v-html="$marked(body)" class="markdown-body"/>
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
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    try {
      return await import('~/content/blog/posts/technologies/' +
        params.slug +
        '.json');
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found.' });
    }
  },
};
</script>
