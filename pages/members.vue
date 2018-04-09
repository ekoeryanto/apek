<template>
  <div>
    <apek-title :title="title" />
    <v-container
      grid-list-md
    >
      <v-data-iterator
        :items="members"
        content-tag="v-layout"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        hide-actions
        row
        wrap
      >
        <v-flex
          slot="item"
          slot-scope="props"
          sm12
          md6
        >
          <v-card>
            <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
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
import { VDataIterator, VDivider } from 'vuetify';

const title = 'Members';
import ApekTitle from '~/components/ApekTitle';

export default {
  components: {
    ApekTitle,
    VDataIterator,
    VDivider,
  },
  head: () => ({
    title,
  }),
  asyncData() {
    const context = require.context('~/content/members/', false, /\.json$/);

    const members = context.keys().map(key => ({
      ...context(key),
      _path: `/member/${key.replace('.json', '').replace('./', '')}`,
    }));
    return { members };
  },
  data() {
    return {
      title,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
    };
  },
};
</script>
