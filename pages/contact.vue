<template>
  <div>
    <apek-title :title="title"/>
    <v-container
      v-if="$data.body"
      v-html="$md.render($data.body)"/>
    <v-container v-else>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et id sunt facilis tempora eum eaque saepe delectus corrupti eius rerum harum magni, vitae soluta error molestias, doloribus ipsam? Voluptatem, amet.
    </v-container>
  </div>
</template>

<script>
const title = 'Contact';

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
    const data = await import('~/content/pages/contact.json');
    return data;
  },
};
</script>
