<template>
  <div>
    <apek-title :title="title"/>
    <v-container v-if="$data.body" v-html="$marked($data.body)" class="markdown-body" />
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
  async asyncData() {
    const data = await import('~/content/pages/secretariat.json');
    return data;
  },
};
</script>
