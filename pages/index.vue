<template>
  <div>
    <v-container
      fluid
      fill-height
      class="px-0 py-0"
    >
      <v-carousel v-if="$data.carousel" :hide-controls="carousel.length < 2" :hide-delimiters="carousel.length < 2">
        <v-carousel-item v-for="(item, i) in carousel" :src="item.image" :key="i"></v-carousel-item>
      </v-carousel>
    </v-container>
    <div
      v-cloak
      v-if="$data.business"
      class="business-field bgx"
    >
      <v-container
        class="text-xs-center"
        grid-list-xl
      >
        <template v-if="$data.business">
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
        </template>

        <template v-if="$data.sponsor">
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
                :title="b.title"
                height="80px"
              >
              <!-- <div class="title my-4 white--text">{{ b.title }}</div> -->
            </v-flex>
          </v-layout>
        </template>
      </v-container>
    </div>
  </div>
</template>

<script>
import ProgressiveBackground from '@/components/background.vue';
import ProgressiveImage from '@/components/image.vue';
import VCarousel from 'vuetify/es5/components/VCarousel/VCarousel';
import VCarouselItem from 'vuetify/es5/components/VCarousel/VCarouselItem';

export default {
  components: {
    ProgressiveBackground,
    ProgressiveImage,
    VCarousel,
    VCarouselItem,
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

    return {
      posts: [
        'Fabrication',
        'Machining',
        'Construction',
        'M.E. & Maintenance',
        'Machine Maker',
        'Automation',
        'Engineering Consultant',
        'Technical Supplier',
        'et cetera.',
      ],
    };
  },
};
</script>

<style>
.bgy {
  background-image: linear-gradient(-322deg, #000000 8%, #da2b2b 78%);
}

.jumbotron__image {
  width: 100%;
  height: 100%;
}
</style>
