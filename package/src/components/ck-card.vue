<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
// types
import type { CleekOptions, Layout } from '@/types/cleek-options';
// hooks
import hooks from '../utils/global-hooks';

const props = defineProps<{
  modelValue?: boolean;
  title?: string;
  subtitle?: string;
  block?: boolean;
  hideCloseBtn?: boolean;
  layout?: Layout;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'closeCard'): void;
}>();

let cleekOptions: Ref<undefined | CleekOptions> = ref();

const isActive = computed({
  get() {
    if (props.modelValue === null) return true;
    return !!props.modelValue;
  },
  set(val: boolean) {
    emits('update:modelValue', val);
    if (!val) emits('closeCard');
  },
});
const computedHideCloseBtn = computed(() => {
  if (props.hideCloseBtn) return true;
  if (props.modelValue === null) return true;
  return false;
});
const computedClass = computed(() => {
  const list = [];
  const layout = props.layout || cleekOptions.value?.styles.layout;
  if (layout) list.push(`layout--${layout}`);
  return list;
});

onMounted(() => {
  cleekOptions.value = hooks.getCleekOptions(getCurrentInstance);
});
</script>

<template>
<div
  v-if="isActive"
  class="ck-card"
  :class="computedClass"
>
  <div
    v-if="title || !computedHideCloseBtn"
    class="ck-card__header"
  >
    <div v-if="title" class="ck-card__header-title">
      {{ title }}
    </div>
    <div
      v-if="!computedHideCloseBtn"
      class="ck-card__close-btn"
      @click="isActive = false"
    >
      <ck-icon icon="times"/>
    </div>
  </div>
  <div class="ck-card__body">
    <div v-if="subtitle" class="ck-card__header-subtitle">
      {{ subtitle }}
    </div>
    <div class="ck-card__content" :class="{ 'content-block': block }">
      <slot/>
    </div>
  </div>
</div>
</template>

<style lang="stylus" scoped>
.ck-card
  background-color white
  my-box-shadow(0.1)
  padding 1rem
  border-radius 1rem
  width 100%
  .ck-card__header
    display flex
    align-items center
    justify-content space-between
    .ck-card__header-title
      display inline-block
      font-size 1.25rem
      margin-left 0.5rem
      padding-left 0.5rem
      padding-right 1.5rem
      padding-bottom 0.1rem
      margin-bottom 0.5rem
      border-bottom 1px solid #999
    .ck-card__close-btn
      width 35px
      height @width
      display inline-flex
      align-items center
      justify-content center
      border-radius 0.5rem
      cursor pointer
      font-size 1.25rem
      // background-color red
      &:hover
        my-box-shadow(0.1)
  .ck-card__body
    width 100%
    .ck-card__content
      width 100%
      display flex
      flex-wrap wrap
      align-items flex-end
      &.content-block
        display block
    .ck-card__header-subtitle
      margin-left 1.5rem
      font-size 0.9rem
      margin-bottom 1rem

// layout
.ck-card
  &.layout--squared
    border-radius 0
    .ck-card__close-btn
      border-radius 0
</style>
