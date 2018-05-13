<template>
  <div>
    <apek-title :title="page.title" />
    <v-container
      grid-list-md
    >
      <v-text-field
          append-icon="search"
          autofocus
          label="Search"
          single-line
          hide-details
          v-model="search"
          class="mb-3"
      />

      <v-data-iterator
        :search="search"
        :items="members"
        item-key="title"
        content-tag="v-layout"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        row
        wrap
      >
        <v-flex
          slot="item"
          slot-scope="props"
          sm12
          md6
        >
          <v-card tile ripple nuxt :to="props.item._path" hover>
            <v-card-title>
              <h4>
                {{ props.item.title }}
              </h4>
            </v-card-title>
            <v-divider />
            <v-list dense>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.business.join(', ') }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.address }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>email</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.email.join(', ') }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.phone.join(', ') }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>print</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ props.item.fax && props.item.fax.join() || '-' }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { VDataIterator, VDivider, VTextField } from 'vuetify';

import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
    VTextField,
    VDataIterator,
    VDivider,
  },
  async asyncData() {
    const page = await import(`~/content/pages/members.json`);
    return { page };
  },
  data() {
    const context = require.context('~/content/members/', false, /\.json$/);

    const members = context.keys().map(key => ({
      ...context(key),
      _path: `/member/${key.replace('.json', '').replace('./', '')}`,
    }));

    return {
      members,
      search: '',
      rowsPerPageItems: [{ text: 'All', value: -1 }, 2, 4, 8, 16, 20],
      pagination: {
        rowsPerPage: 2,
      },
    };
  },
  head() {
    return {
      title: this.page.title,
    };
  },
  mounted() {
    import('crawler-user-agents/crawler-user-agents.json')
      .then(crawlers => Object.values(crawlers).map(c => c.pattern))
      .then(bots => {
        if (
          bots.findIndex(el => RegExp(el).test(window.navigator.userAgent) > -1)
        ) {
          this.pagination.rowsPerPage = -1;
        }
      });
  },
};
</script>
