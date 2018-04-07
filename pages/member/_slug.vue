<template>
  <article>
    <h1>{{ title }}</h1>
    <h2>{{ address }}</h2>
    <div
      v-if="$data.body || null"
      v-html="$marked(body)" />
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
