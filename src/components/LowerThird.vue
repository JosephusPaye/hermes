<template>
  <template v-if="subtitleGroups.length > 0">
    <LowerThirdSlide
      v-for="(group, index) in subtitleGroups"
      :key="index"
      :backgroundImage="backgroundImage"
      :titleSubtitleGap="titleSubtitleGap"
      :titleGroup="titleGroups[0]"
      :titleSettings="titleSettings"
      :subtitleGroup="group"
      :subtitleSettings="subtitleSettings"
      :titleSafePadding="titleSafePadding"
      :width="width"
      :height="height"
      :maxSafeWidth="maxSafeWidth"
      :maxSafeHeight="maxSafeHeight"
    />
  </template>
  <template v-else-if="titleGroups.length > 0">
    <LowerThirdSlide
      :backgroundImage="backgroundImage"
      :titleSubtitleGap="titleSubtitleGap"
      :titleGroup="titleGroups[0]"
      :titleSettings="titleSettings"
      :subtitleGroup="undefined"
      :subtitleSettings="subtitleSettings"
      :titleSafePadding="titleSafePadding"
      :width="width"
      :height="height"
      :maxSafeWidth="maxSafeWidth"
      :maxSafeHeight="maxSafeHeight"
    />
  </template>
  <template v-else>
    <LowerThirdSlide
      :backgroundImage="backgroundImage"
      :titleSubtitleGap="titleSubtitleGap"
      :titleGroup="undefined"
      :titleSettings="titleSettings"
      :subtitleGroup="undefined"
      :subtitleSettings="subtitleSettings"
      :titleSafePadding="titleSafePadding"
      :width="width"
      :height="height"
      :maxSafeWidth="maxSafeWidth"
      :maxSafeHeight="maxSafeHeight"
    />
  </template>
</template>

<script>
import LowerThirdSlide from './LowerThirdSlide.vue';
import { layoutText, measureText } from '../svg';

export default {
  name: 'LowerThird',

  components: { LowerThirdSlide },

  props: {
    lowerThird: {
      type: Object,
      required: true,
    },
    backgroundImage: String,
  },

  data() {
    return {
      width: 1920,
      height: 1080,
      titleSafePadding: {
        left: 96,
        right: 96,
        top: 54,
        bottom: 54,
      },
      titleSubtitleGap: 12,
      titleSettings: {
        lineSpacing: 0,
        maxLines: 1,
        padding: {
          x: 32,
          y: 12,
        },
        font: {
          fontFamily: 'Poppins, Segoe UI, Helvetica, Arial, sans-serif',
          fontSize: '54px',
          fontWeight: 'bold',
          fill: 'rgb(251,16,93)',
          dominantBaseline: 'central',
        },
        background: {
          color: 'rgba(0,0,0,0.9)',
          minWidth: 0,
        },
      },
      subtitleSettings: {
        lineSpacing: 4,
        maxLines: 3,
        padding: {
          x: 32,
          y: 16,
        },
        font: {
          fontFamily: 'Poppins, Segoe UI, Helvetica, Arial, sans-serif',
          fontSize: '40px',
          fontWeight: 'normal',
          dominantBaseline: 'central',
          fill: '#fff',
        },
        background: {
          color: 'rgba(0,0,0,0.85)',
          minWidth: 1728, // maxSafeWidth
        },
      },
    };
  },

  computed: {
    maxSafeWidth() {
      return 1920 - this.titleSafePadding.left - this.titleSafePadding.right;
    },

    maxSafeHeight() {
      return 1080 - this.titleSafePadding.top - this.titleSafePadding.bottom;
    },

    titleGroups() {
      if (!this.lowerThird.title) {
        return [];
      }

      return this.measure(this.lowerThird.title, this.titleSettings);
    },

    subtitleGroups() {
      if (!this.lowerThird.subtitle) {
        return [];
      }

      return this.measure(this.lowerThird.subtitle, this.subtitleSettings);
    },
  },

  methods: {
    measure(text, settings) {
      const lineGroups = layoutText(
        text,
        {
          maxWidth: this.maxSafeWidth - settings.padding.x * 2,
          maxLines: settings.maxLines,
        },
        settings.font,
        { lineSpacing: settings.lineSpacing }
      );

      const groups = lineGroups.map((group) => {
        return {
          ...group,
          paddedWidth: Math.ceil(group.width) + settings.padding.x * 2,
          paddedHeight: Math.ceil(group.height) + settings.padding.y * 2,
        };
      });

      return groups;
    },
  },
};
</script>
