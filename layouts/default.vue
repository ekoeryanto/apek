<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      right
      temporary
      fixed
      app>
      <v-list>
        <template v-for="item in shownMenus">
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item['icon-alt'] : item['icon']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.to || '/inspire'"
              class="ml-3"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            :key="item.text"
            :to="item.to || '/'">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      app>
      <img
        src="/images/uploads/logo128x.png"
        alt="APEK">

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, i) in shownMenus">
          <v-menu
            v-if="item.children"
            :key="item.text"
            open-on-hover
            offset-y>
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

      <v-toolbar-side-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer dark>
      <v-layout
        row
        class="px-4"
        justify-space-around
        align-center
      >
        <v-flex>
          &copy; APEK 2018
        </v-flex>

        <v-flex class="text-xs-right">
          <v-btn
            v-for="sos in social"
            :key="sos.url"
            :href="sos.url"
            target="_blank"
            icon
            class="my-0"
          >
            <v-icon v-text="sos.icon"/>
          </v-btn>
        </v-flex>

      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { menu } from '~/content/data/settings.json';
import { social } from '~/content/pages/contact.json';

export default {
  data() {
    return {
      drawer: false,
      menu,
      social,
    };
  },
  computed: {
    shownMenus() {
      return this.menu.filter(menu => menu.show !== false);
    },
  },
  methods: {},
};
</script>
