<template>
  <div>
    <apek-title :title="title"/>
    <v-container
      v-if="$data.body"
      v-html="$marked($data.body)"/>
  </div>
</template>

<script>
const title = 'Business';
import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
  },
  head: () => ({
    title,
  }),
  asyncData() {
    return import('~/content/pages/business.json');
  },
};
</script>
