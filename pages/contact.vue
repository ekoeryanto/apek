<template>
  <div>
    <apek-title
      :subtitle="intro"
      :title="title"
    />
    <v-container grid-list-xl>
      <v-layout
        row
        wrap
        grid-list-xs
      >

        <v-flex md6>
          <form
            ref="contact"
            lazy-validation
            name="contact"
            column
            data-netlify="true"
            action=""
            method="post"
          >
            <div style="display: none">
              <input name="bot-field">
            </div>
            <v-text-field
              label="Name"
              flex
              required
            />

            <v-text-field
              label="E-mail"
              required
            />

            <v-text-field
              label="Message"
              multi-line
              rows="3"
              counter="160"
              no-resize
              required
            />
            <div class="text-xs-right">
              <v-btn
                v-if="form.name || form.email || form.message || !form.valid"
                flat
                @click="clear"
              >
                clear
              </v-btn>
              <v-btn
                :disabled="!form.valid"
                flat
              >
                submit
              </v-btn>
            </div>
          </form>
        </v-flex>

        <v-flex>
          <v-list style="background: transparent">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mdi-home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="address.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mdi-email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="email.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mdi-phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="phone.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>mdi-fax</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="fax.join(', ')" />
            </v-list-tile>
          </v-list>
          <div>
            <template v-for="network in social">
              <v-btn
                :key="network.vendor"
                :href="network.url"
                target="_blank"
                icon
                flat>
                <v-icon v-text="network.icon" />
              </v-btn>
            </template>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const title = 'Contact';

import ApekTitle from '~/components/ApekTitle';
import { VForm, VTextField } from 'vuetify';

export default {
  components: {
    ApekTitle,
    VForm,
    VTextField,
  },
  head: () => ({
    title,
  }),
  data: () => ({
    title,
    form: {
      valid: true,
      name: '',
      nameRules: [v => !!v || 'Name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      message: '',
      messageRules: [v => !!v || 'Message is required'],
    },
  }),
  async asyncData() {
    const data = await import('~/content/pages/contact.json');
    return data;
  },
  methods: {
    submit() {
      if (this.$refs.contact.validate()) {
        // Native form submission is not yet supported
      }
    },
    clear() {
      this.$refs.contact.reset();
    },
  },
};
</script>
