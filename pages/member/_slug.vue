<template>
  <article>
    <h1>{{ title }}</h1>
    <div v-html="$md.render(body)" />
  </article>
</template>

<script>
export default {
  async asyncData({ params }) {
    let member = await import('~/content/members/' + params.slug + '.json');
    return member;
  },
};
</script>
