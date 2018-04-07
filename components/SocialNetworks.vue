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
        <fa
          v-if="network.vendor === 'Twitter'"
          :icon="['fab', 'twitter']"
          :size="iconSize"
          style="color: #2196F3"
        />
        <fa
          v-else-if="network.vendor === 'Facebook'"
          :icon="['fab', 'facebook']"
          style="color: #3F51B5"
          :size="iconSize"
        />
        <fa
          v-else-if="network.vendor === 'Instagram'"
          :icon="['fab', 'instagram']"
          :size="iconSize"
          style="color: #6A1B9A"
        />
        <fa
          v-else-if="network.vendor === 'Google Plus'"
          :icon="['fab', 'google-plus']"
          :size="iconSize"
          style="color: #F44336"
        />
      </a>
    </template>
  </div>
</template>


<script>
export default {
  props: {
    networks: {
      type: Array,
      required: true,
    },
    btnClass: {
      type: String,
      required: false,
    },
    iconSize: {
      type: String,
      required: false,
      default: 'lg',
    },
  },
};
</script>
