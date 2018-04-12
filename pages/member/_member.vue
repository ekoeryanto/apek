<template>
  <div>
    <apek-title :title="title" :subtitle="business.join(', ')" />
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm12 md10>
          <img v-if="$data.thumbnail" :src="$data.thumbnail" :alt="title" width="100%">
        </v-flex>
        <v-flex v-if="$data.detail" v-html="$marked($data.detail)" class="markdown-body body-1 color-inherit" />
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
  },
  async asyncData({ params }) {
    let member = await import('~/content/members/' + params.member + '.json');
    return member;
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
