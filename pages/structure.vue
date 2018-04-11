<template>
  <div>
    <apek-title :title="title"/>
    <v-container>
      <img :src="$data.image" alt="Struktur Organisasi" width="100%">
      <div v-if="$data.body" v-html="$marked($data.body)" class="markdown-body body-1 color-inherit" />
    </v-container>
  </div>
</template>

<script>
const title = 'Structure';
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
  asyncData() {
    return import('~/content/pages/structure.json');
  },
  data: () => ({
    title,
  }),
};
</script>
