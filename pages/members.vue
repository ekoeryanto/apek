<template>
  <section class="container">
    <h2>member</h2>
    <ul>
      <li
        v-for="post in posts"
        :key="post.date">
        <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  head: () => ({
    title: 'Members',
  }),
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/members/', false, /\.json$/);

    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/member/${key.replace('.json', '').replace('./', '')}`,
    }));

    return { posts };
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
};
</script>
