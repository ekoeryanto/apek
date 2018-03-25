<template>
  <section class="container">
    <h2>{{ title }}</h2>
    <div v-html="$md.render(body)"/>
  </section>
</template>

<script>
export default {
  head: () => ({
    title: 'Sekretariat',
  }),
  async asyncData() {
    const data = await import('~/content/pages/secretariat.json');
    return data;
  },
};
</script>
