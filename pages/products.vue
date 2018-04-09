<template>
  <div>
    <apek-title :title="title"/>
    <v-container
      v-if="$data.body"
      v-html="$marked($data.body)"/>
    <v-container v-else>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et id sunt facilis tempora eum eaque saepe delectus corrupti eius rerum harum magni, vitae soluta error molestias, doloribus ipsam? Voluptatem, amet.
    </v-container>
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
