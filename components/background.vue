<template>
  <div :class="$style.component">
    <div v-if="!shouldImageRender">
      <canvas
        ref="canvas"
        width="1"
        height="1"
        class="canvas"
      />
      <img
        ref="main"
        :src="image"
        hidden>
    </div>
    <div :style="wrapperStyle">
      <transition
        :enter-class="$style.enter"
        :enter-active-class="$style.before">
        <div
          v-if="shouldImageRender"
          :class="$style.image"
          :style="imageStyle">
          <slot />
        </div>
      </transition>
      <div :class="$style.slot">
        <slot name="after" />
      </div>
      <transition
        :enter-class="$style.enter"
        :enter-active-class="$style.before">
        <div
          v-if="shouldPlaceholderRender"
          :class="$style.placeholder"
          :style="placeholderStyle"/>
      </transition>
    </div>
  </div>
</template>

<script>
import image from '@/mixins/image';

export default {
  name: 'ProgressiveBackground',

  mixins: [image],

  props: {
    overlay: {
      type: String,
      required: false,
      default: '',
    },
    noRatio: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      applyRatio: !this.noRatio,
    };
  },

  computed: {
    imageStyle() {
      return {
        backgroundImage: this.overlayImage(this.image),
        backgroundAttachment: 'fixed',
      };
    },

    placeholderStyle() {
      return {
        ...this.blurStyle,
        backgroundImage: this.overlayImage(this.placeholderImage),
      };
    },
  },

  methods: {
    overlayImage(image) {
      return this.overlay
        ? `${this.overlay}, url('${image}')`
        : `url('${image}')`;
    },
  },
};
</script>

<style module lang="css">
.component {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slot {
  position: relative;
  z-index: 1;
}

.canvas {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.4s ease-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.placeholder {
  composes: image;
  transform: scale(1.1);
  z-index: 0;
}

.before {
  opacity: 1;
}

.enter {
  opacity: 0;
}
</style>
