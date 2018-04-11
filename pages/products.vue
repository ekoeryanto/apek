<template>
  <div>
    <apek-title :title="title"/>
    <v-container
      v-if="$data.body"
      v-html="$marked($data.body)"/>
  </div>
</template>

<script>
import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
  },
  head() {
    return {
      title: this.title,
    };
  },
  data: () => ({
    title,
  }),
  asyncData() {
    return import('~/content/pages/products.json');
  },
};
</script>
