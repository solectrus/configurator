<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  tabs: {
    type: Array,
    required: true,
  },
})

const activeTab = ref(0)

const setActiveTab = (index: number) => {
  activeTab.value = index
}
</script>

<template>
  <div class="flex flex-col">
    <nav class="sticky top-0 z-10 flex gap-5 bg-slate-700/90 p-4 text-sm text-gray-200">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="rounded-sm px-3 py-1 font-mono"
        :class="{ 'bg-gray-900/90 text-white': activeTab === index }"
        @click="setActiveTab(index)"
      >
        {{ tab }}
      </button>
    </nav>

    <slot :name="`tab-${activeTab}`" />
  </div>
</template>
