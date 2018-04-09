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
const title = 'Structure';
import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
  },
  head: () => ({
    title,
  }),
  asyncData() {
    return import('~/content/pages/structure.json');
  },
  data: () => ({
    title,
  }),
};
</script>
