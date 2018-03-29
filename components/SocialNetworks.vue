<template>
  <div>
    <template v-for="network in networks">
      <a
        :key="network.vendor"
        :href="network.url"
        :class="btnClass"
        target="_blank"
        icon
        class=""
        flat>
        <twitter-icon
          v-if="network.vendor === 'Twitter'"
          fill-color="#2196F3"
        />
        <facebook-icon
          v-else-if="network.vendor === 'Facebook'"
          fill-color="#3F51B5"
        />
        <instagram-icon
          v-else-if="network.vendor === 'Instagram'"
          fill-color="#6A1B9A"
        />
        <google-plus-icon
          v-else-if="network.vendor === 'Google Plus'"
          class="red--text"
          fill-color="#F44336"
        />
      </a>
    </template>
  </div>
</template>


<script>
import FacebookIcon from 'vue-material-design-icons/facebook';
import InstagramIcon from 'vue-material-design-icons/instagram';
import TwitterIcon from 'vue-material-design-icons/twitter';
import GooglePlusIcon from 'vue-material-design-icons/google-plus';
export default {
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    GooglePlusIcon,
  },
  props: {
    networks: {
      type: Array,
      required: true,
    },
    btnClass: {
      type: String,
      required: false,
    },
  },
};
</script>
