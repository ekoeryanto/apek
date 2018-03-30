<template>
  <div>
    <img src="images/cover-andri.jpg" width="100%">
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
export default {
  components: {},
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
