<template>
  <v-toolbar-items class="hidden-sm-and-down">
    <template v-for="(item, i) in items">
      <no-ssr
        v-if="item.children"
        :key="item.text"
      >
        <v-menu
          open-on-hover
          offset-y
        >
          <v-btn
            slot="activator"
            flat
            v-text="item.text"
          />
          <v-list>
            <v-list-tile
              v-for="child in item.children"
              :key="child.text"
              :to="child.to">
              <v-list-tile-title>{{ child.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </no-ssr>
      <v-btn
        v-else
        :key="item.to || i"
        :to="item.to"
        :exact="item.exact"
        flat>
        {{ item.text }}
      </v-btn>
    </template>
  </v-toolbar-items>
</template>
<script>
import { VMenu } from 'vuetify';

export default {
  components: {
    VMenu,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
