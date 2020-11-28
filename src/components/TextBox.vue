<template>
  <g data-id="textbox-wrapper" v-html="svg"></g>
</template>

<script>
import { createElement } from '../svg';

export default {
  name: 'TextBox',

  props: {
    group: Object,
    settings: Object,
  },

  computed: {
    textEls() {
      const textEls = this.group.lines
        .map((line) => {
          return createElement('text', line.text, {
            ...this.settings.font,
            x: line.position.x,
            y: line.measure.height + line.position.y,
          });
        })
        .join('\n');

      return createElement('g', textEls, {
        dataId: 'text-lines',
      });
    },

    backgroundEl() {
      return createElement('rect', '', {
        width: Math.max(
          this.settings.background.minWidth,
          this.group.paddedWidth
        ),
        height: this.group.paddedHeight,
        fill: this.settings.background.color,
      });
    },

    svg() {
      const text = this.textEls;

      if (!text) {
        return undefined;
      }

      const background = this.backgroundEl;

      if (!background) {
        return undefined;
      }

      const groupLineHeight = this.group.lines[0].measure.height;

      const textPadded = createElement('g', text, {
        dataId: 'text-padded',
        transform: `translate(${this.settings.padding.x},${-(
          groupLineHeight / 2 -
          this.settings.padding.y
        )})`,
      });

      return createElement('g', background + textPadded, {
        dataId: 'textbox',
      });
    },
  },

  methods: {
    alignBaseline(textHeight, containerHeight) {
      const diff = containerHeight - textHeight;
      return diff / 2;
    },
  },
};
</script>
