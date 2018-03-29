<template>
  <div>
    <v-container
      fluid
      fill-height
      class="px-0 py-0"
    >
      <progressive-background
        src="/images/atom.jpg"
        placeholder="/images/atom@20x.jpg"
        blur.number="30"
        style="height: 98vh"
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
              width="80%"
            >
            <div
              class="title"
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

          <v-flex style="min-height: 70px">
            <vue-typer
              class="white--text"
              :text=posts
              :repeat='Infinity'
              :shuffle='false'
              initial-action='typing'
              :pre-type-delay='70'
              :type-delay='70'
              :pre-erase-delay='2000'
              :erase-delay='100'
              erase-style='backspace'
              :erase-on-complete='false'
              caret-animation='phase'
            />
          </v-flex>

          <v-flex>
            <v-btn
              icon
              @click="$vuetify.goTo('.business-field', {offset: -65})"
            >
              <v-icon color="white">expand_more</v-icon>
            </v-btn>
          </v-flex>

        </v-layout>
      </progressive-background>
    </v-container>
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

.vue-typer {
  font-family: Copperplate, 'Copperplate Gothic Light', fantasy;
}

.vue-typer .custom.char.typed {
  color: #607d8b;
  font-size: 38px;
}
.vue-typer .custom.char.selected {
  color: #607d8b;
  background-color: transparent;
  text-decoration: line-through;
}

.vue-typer .custom.caret {
  display: none;
}
</style>
