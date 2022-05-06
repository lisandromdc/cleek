<template lang="pug">
.ck-table__header-items
  template(v-if="!hideHeaderActions")
    //- refresh btn
    ck-button(
    v-if="refreshBtnIsVisible"
    type="flat"
    icon="rotate-right"
    title="Recargar lista"
    @click="$emit('refreshList', false)"
    )
    //- pages
    .items-per-page(
    v-if="itemsPerPageIsVisible"
    :class="{ 'ck-component__group--left': (!hideSearch) }"
    )
      | {{ itemsPerPageStart }} - {{ itemsPerPageEnd }} de {{ listLength }}
    //- search
    ck-input(
    v-if="!hideSearch"
    v-model="searchLocal"
    icon="magnifying-glass"
    placeholder="Buscar..."
    :group="searchGroupValue"
    @input="checkRefresh()"
    )
    //- columns manager
    ck-button(
    icon="columns"
    type="filled"
    title="Administrador de columnas"
    v-if="hasColumnsManager"
    :group="itemsPerPageIsVisible || !hideSearch ? 'right' : ''"
    @click="$emit('openColumnsManager')"
    )
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ckButton from '../../ck-button.vue';
import ckInput from '../../ck-input.vue';

const props = defineProps({
  search: { type: String, default: undefined, },
  hasColumnsManager: { type: Boolean, default: false },
  showRefreshBtn: { type: Boolean, required: true },
  hideItemsPerPage: { type: Boolean, required: true },
  currentPage: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  hideHeaderActions: { type: Boolean, required: true },
  listLength: { type: Number, default: 0 },
});
const emits = defineEmits(['update:search', 'refreshList', 'openColumnsManager']);


const searchLocal = computed({
  get() { return props.search; },
  set(val) { emits('update:search', val); }
});
const hideSearch = computed(() => {
  return typeof searchLocal.value === 'undefined';
});
const itemsPerPageStart = computed(() => {
  return (props.currentPage -1) * props.itemsPerPage + 1;
});
const itemsPerPageEnd = computed(() => {
  const value = props.currentPage * props.itemsPerPage;
  if (!props.itemsPerPage || value > props.listLength) return props.listLength;
  return value;
});
const itemsPerPageIsVisible = computed(() => {
  return !props.hideItemsPerPage && props.listLength && props.currentPage;
});
const refreshBtnIsVisible = computed(() => {
  return itemsPerPageIsVisible.value || props.showRefreshBtn;
});
const searchGroupValue = computed(() => {
  if (itemsPerPageIsVisible.value && props.hasColumnsManager) {
    return 'center';
  }
  if (itemsPerPageIsVisible.value) return 'right';
  if (props.hasColumnsManager) return 'left';
  return '';
});

function checkRefresh() {
  const search = searchLocal.value;
  setTimeout(() => {
    if (search !== searchLocal.value) return;
    emits('refreshList', false);
  }, 1000);
}
</script>

<style lang="stylus" scoped>
@import '../../../styles/index';
.ck-table__header-items
  display flex
  .items-per-page
    font-size $globalFontSize-s
    display flex
    align-items center
    cursor pointer
    padding-x 10px
    // background-color rgba($globalBorderColor, .15) FIXRGBA
    border 1px solid $globalBorderColor
    border-radius:  $globalBorderRadius
</style>