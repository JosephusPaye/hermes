<template>
  <g v-html="svg"></g>
</template>

<script>
import { layoutText, createElement } from '../svg';

export default {
  name: 'Title',

  props: {
    text: String,
    padding: Object,
    font: Object,
    maxWidth: Number,
    maxHeight: Number,
  },

  computed: {
    measure() {
      if (!this.text) {
        return;
      }

      const layout = layoutText(
        this.text,
        {
          width: this.maxWidth - this.padding.x * 2,
          height: this.maxHeight - this.padding.y * 2,
        },
        this.font,
        { lineSpacing: 0 }
      );

      const { text, measure } = layout.wrapped[0]; // get the first line of the wrapped title text

      return {
        text,
        width: measure.width,
        height: measure.height,
        paddedWidth: Math.ceil(measure.width) + this.padding.x * 2,
        paddedHeight: Math.ceil(measure.height) + this.padding.y * 2,
      };
    },

    textEl() {
      const measure = this.measure;

      if (!measure) {
        return undefined;
      }

      return createElement('text', measure.text, {
        ...this.font,
        x: 0,
        y: measure.height * 0.95,
      });
    },

    backgroundEl() {
      const measure = this.measure;

      if (!measure) {
        return undefined;
      }

      return createElement('rect', '', {
        width: measure.paddedWidth,
        height: measure.paddedHeight,
        fill: 'rgba(0,0,0,0.85)',
      });
    },

    svg() {
      const text = this.textEl;

      if (!text) {
        return undefined;
      }

      const background = this.backgroundEl;

      if (!background) {
        return undefined;
      }

      const textPadded = createElement('g', text, {
        dataId: 'text',
        transform: `translate(${this.padding.x},0)`,
      });

      return createElement('g', background + textPadded, {
        dataId: 'title',
      });
    },
  },
};
</script>
