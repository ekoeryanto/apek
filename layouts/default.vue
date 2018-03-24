<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      right
      temporary
      fixed
      app>
      <v-list>
        <template v-for="item in items">
          <!-- <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs6
              class="text-xs-center">
              <a
                href="#!"
                class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout> -->
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
      :clipped-left="clipped"
      fixed
      app>
      <img
        src="/logo128x.png"
        alt="APEK">

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, i) in items">
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

      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'mdi-chevron-right' : 'mdi-chevron-left'"/>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-division</v-icon>
      </v-btn> -->

      <v-toolbar-side-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      items: [
        { icon: 'mdi-contacts', text: 'Home', to: '/', exact: true },
        { icon: 'mdi-history', text: 'Products', to: '/products' },
        { icon: 'mdi-content-copy', text: 'Members', to: '/members' },
        {
          'icon-alt': 'mdi-minus',
          icon: 'mdi-chevron-down',
          model: false,
          text: 'Profile',
          children: [
            { icon: 'mdi-plus', text: 'Secretariat' },
            { icon: 'mdi-plus', text: 'Org. Structure' },
            { icon: 'mdi-plus', text: 'Business Field' },
            { icon: 'mdi-plus', text: 'Vision and Mission' },
          ],
        },
        {
          'icon-alt': 'mdi-minus',
          icon: 'mdi-chevron-down',
          model: false,
          text: 'Info',
          children: [
            { text: 'Announcement' },
            { text: 'Activity' },
            { text: 'Technology' },
          ],
        },
        { icon: 'mdi-history', text: 'Contact', to: '/inspire' },
      ],
    };
  },
  methods: {},
};
</script>
