<template>
  <div>
    <progressive-background
      src="/images/uploads/atom.jpg"
      placeholder="/images/atom@20x.jpg"
      blur.number="30"
      overlay="linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)">
      <v-layout
        column
        align-center
        align-content-space-between
        justify-center
        align
        class="text-xs-center white--text fill-height">
        <v-spacer/>
        <v-flex>
          <img
            :src="jumbotron.image"
            alt="APEK"
          >
          <div
            class="headline"
            v-html="$md.render(jumbotron.body)"
          />
          <!--
            <progressive-image
              :src="jumbotron.image"
              :placeholder="jumbotron.image"
              blur.number="30"
            />
          -->
        </v-flex>
        <v-flex>
          <v-btn
            icon
            @click="$vuetify.goTo('.business-field', {offset: -65})"
          >
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-btn>
        </v-flex>

      </v-layout>
    </progressive-background>
    <div
      class="business-field bgx"
    >
      <v-container
        class="text-xs-center"
        grid-list-xl
      >
        <h2 class="display-1 mb-4 white--text">Business Fields</h2>
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            v-for="b in business"
            :key="b.title"
            md3
            class="my-3"
          >
            <v-icon
              dark
              size="100px"
              v-text="b.icon"
            />
            <div class="title my-4 white--text">{{ b.title }}</div>
          </v-flex>
        </v-layout>
        <h2 class="mt-5 pt-5 display-1 mb-4 white--text">Sponsors</h2>
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            v-for="b in sponsor"
            :key="b.title"
            md3
            class="my-3"
          >
            <img
              :src="b.image"
              :alt="b.title"
              height="80px"
            >
            <!-- <div class="title my-4 white--text">{{ b.title }}</div> -->
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import ProgressiveBackground from '@/components/background.vue';
import ProgressiveImage from '@/components/image.vue';
// import * as easings from 'vuetify/es5/util/easing-patterns';

export default {
  components: {
    ProgressiveBackground,
    ProgressiveImage,
  },
  head() {
    return {
      title: 'Home',
    };
  },
  async asyncData() {
    return await import('~/content/pages/home.json');
  },
  data() {
    // Using webpacks context to gather all files from a folder
    // const context = require.context('~/content/blog/posts/', false, /\.json$/);

    // const posts = context.keys().map(key => ({
    //   ...context(key),
    //   _path: `/blog/${key.replace('.json', '').replace('./', '')}`,
    // }));

    return { posts: [] };
  },
};
</script>

<style scoped>
.bgy {
  background-image: linear-gradient(-322deg, #000000 8%, #da2b2b 78%);
}
</style>
