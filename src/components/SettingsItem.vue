<template>
  <div class="settings-item d-flex justify-between mb-20px pointer">
    <div class="d-flex">
      <component class="mr-5px" :is="listIcon"></component>
      <span>{{ city.name }}, {{ city.code }} {{ city.flag }}</span>
    </div>
    <component @click="onDelete" :is="trashIcon"></component>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { City } from '@/types'

export default Vue.extend({
  name: 'SettingsItem',
  props: {
    city: {
      type: Object as PropType<City>,
      required: true
    }
  },
  data () {
    return {
      listIcon: require('@/assets/list.svg'),
      trashIcon: require('@/assets/trash.svg')
    }
  },
  methods: {
    onDelete () {
      this.$emit('ondelete')
    }
  }
})
</script>

<style lang="scss" scoped>
.settings-item {
  background: #c2c2c280;
  padding: 5px;
  line-height: 2;
}
</style>
