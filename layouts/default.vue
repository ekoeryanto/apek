<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      app
    >
      <drawer-menu :items="menus" />
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <img src="/images/logo.png" alt="Logo" width="128">
      <v-spacer />
      <toolbar-menu :items="menus" class="mx-3" />
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"/>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer dark height="auto">
      <v-layout
        row
        class="px-4"
        justify-space-around
        align-center
      >
        <v-flex>
          &copy; {{ title }} {{ currentYear }}
        </v-flex>

        <v-flex class="text-xs-right">
          <social-networks :networks="social" btn-class="my-0 mx-3" />
        </v-flex>

      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { menu } from '@/content/data/settings.json';
import { social } from '@/content/pages/contact.json';
import DrawerMenu from '@/components/DrawerMenu';
import ToolbarMenu from '@/components/ToolbarMenu';
import SocialNetworks from '@/components/SocialNetworks';

export default {
  components: {
    DrawerMenu,
    ToolbarMenu,
    SocialNetworks,
  },
  data() {
    return {
      drawer: false,
      menu,
      social,
      title: 'APEK',
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    menus() {
      return this.menu.filter(menu => menu.show !== false);
    },
  },
};
</script>
