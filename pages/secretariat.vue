<template>
  <div>
    <apek-title :title="title"/>
    <v-container v-if="$data.body" v-html="$marked($data.body)" class="markdown-body body-1 color-inherit" />
  </div>
</template>

<script>
const title = 'Secretariat';
import ApekTitle from '~/components/ApekTitle';

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
    return import('~/content/pages/secretariat.json');
  },
};
</script>
