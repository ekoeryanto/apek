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
          :icon="network.icon.split(' ')"
          :size="iconSize"
          :style="{color: network.color}"
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
