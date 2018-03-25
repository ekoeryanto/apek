<template>
  <section class="container">
    <h2>member</h2>
    <ul>
      <li
        v-for="member in members"
        :key="member.date">
        <nuxt-link :to="member._path">
          {{ member.title }}
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

    const members = context.keys().map(key => ({
      ...context(key),
      _path: `/member/${key.replace('.json', '').replace('./', '')}`,
    }));

    return { members };
  },
};
</script>
