<template>
<section class="container">
    <h2>Activities</h2>
    <ul>
      <li v-for="post in posts" :key="post.date">
        <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    const context = require.context(
      '~/content/blog/posts/activities/',
      false,
      /\.json$/
    );

    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/activity/${key.replace('.json', '').replace('./', '')}`,
    }));

    return { posts };
  },
};
</script>
