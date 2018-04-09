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
const title = 'Products';

export default {
  components: {
    ApekTitle,
  },
  head: () => ({
    title,
  }),
  data: () => ({
    title,
  }),
  asyncData() {
    return import('~/content/pages/products.json');
  },
};
</script>
