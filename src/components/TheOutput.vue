<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
import CodeContainer from '@/components/CodeContainer.vue'
import MarkdownContainer from '@/components/MarkdownContainer.vue'
import TabsComponent from '@/components/TabsComponent.vue'

const store = useSurveyStore()
</script>

<template>
  <TabsComponent :tabs="['README.md', 'compose.yaml', '.env']">
    <template #tab-0>
      <MarkdownContainer :markdown="store.readmeFile" filename="README.md" />
    </template>

    <template #tab-1>
      <CodeContainer language="yaml" :code="store.composeFile" filename="compose.yaml" />
    </template>

    <template #tab-2>
      <CodeContainer language="env" :code="store.envFile" filename=".env" />
    </template>
  </TabsComponent>
</template>
