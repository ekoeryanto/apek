<template>
  <div>
    <div class="bgx">
      <h1 class="white--text py-5 px-5">{{ $data.title }}</h1>
    </div>
    <v-container
      v-if="$data.body"
      v-html="$md.render($data.body)"/>
    <v-container v-else>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et id sunt facilis tempora eum eaque saepe delectus corrupti eius rerum harum magni, vitae soluta error molestias, doloribus ipsam? Voluptatem, amet.
    </v-container>
  </div>
</template>

<script>
const title = 'Vision and Mission';

export default {
  head: () => ({
    title,
  }),
  data: () => ({
    title,
  }),
  async asyncData() {
    const data = await import('~/content/pages/vision-mission.json');
    return data;
  },
};
</script>
