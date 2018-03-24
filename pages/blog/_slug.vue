<template>
  <article>
    <h1>{{ title }}</h1>
    <div v-html="$md.render(body)" />
  </article>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
    };
  },
  async asyncData({ params }) {
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let post = await import('~/content/blog/posts/' + params.slug + '.json');
    return post;
  },
};
</script>
