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
        grid-list-md
      >

        <v-flex sm12 md6>
          <v-form
            @submit.prevent="send"
            ref="contact"
            lazy-validation
            name="contact"
            column
            data-netlify="true"
            netlify-honeypot="bot-field"
            method="post"
          >
            <div style="display: none">
              <input name="bot-field">
            </div>
            <v-text-field
              label="Name"
              name="name"
              :rules="form.nameRules"
              v-model="form.name"
              autofocus
              autocomplete="off"
              flex
              required
            />

            <v-text-field
              label="E-mail"
              autocomplete="off"
              name="email"
              v-model="form.email"
              :rules="form.emailRules"
              required
            />

            <v-text-field
              label="Message"
              v-model="form.message"
              :rules="form.messageRules"
              name="message"
              multi-line
              rows="3"
              counter="160"
              no-resize
              required
            />
            <div netlify-recaptcha></div>
            <div class="text-xs-right">
              <v-btn
                v-if="form.name || form.email || form.message || !form.valid"
                flat
                @click="clear"
                type="button"
              >
                clear
              </v-btn>
              <v-btn
                :disabled="!form.valid"
                type="submit"
                dark
              >
                Send
              </v-btn>
            </div>
          </v-form>
        </v-flex>

        <v-flex>
          <v-list style="background: transparent">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="email.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="phone.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>print</v-icon>
              </v-list-tile-action>
              <v-list-tile-content v-text="fax.join(', ')" />
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="address" />
                <v-list-tile-sub-title v-if="address2" v-text="address2" />
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <no-ssr class="mt-4">
            <social-networks :networks="social" btn-class="mx-3" />
          </no-ssr>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      bottom
      right
      v-model="snackbar"
    >
      Your message has been sent, thanks!
      <v-btn flat color="success" @click.native="clear">OK</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
const title = 'Contact';

import ApekTitle from '~/components/ApekTitle';
import { VForm, VTextField, VSnackbar } from 'vuetify';
import SocialNetworks from '@/components/SocialNetworks';
import encode from '@/libs/encode';

export default {
  components: {
    SocialNetworks,
    VSnackbar,
    ApekTitle,
    VForm,
    VTextField,
  },
  head: () => ({
    title,
  }),
  data: () => ({
    title,
    snackbar: false,
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
    send() {
      if (this.$refs.contact.validate()) {
        const { email, name, message } = this.form;
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({ 'form-name': 'contact', email, name, message }),
        })
          .then(() => {
            this.snackbar = true;
          })
          .catch(error =>
            alert(
              'Unable to send message. Please use an alternative contact, thanks.'
            )
          );
      }
    },
    clear() {
      this.snackbar = false;
      this.$refs.contact.reset();
    },
  },
};
</script>
