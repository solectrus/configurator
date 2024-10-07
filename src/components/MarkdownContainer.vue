<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue'
import VueMarkdown from 'vue-markdown-render'

interface MarkdownContainerProps {
  markdown: string
  filename: string
}

defineProps<MarkdownContainerProps>()
</script>

<template>
  <div v-if="markdown" class="sticky right-0 top-16">
    <div class="absolute right-4 top-4">
      <CopyButton :text="markdown" :filename="filename" />
    </div>
  </div>

  <article class="text-sm">
    <vue-markdown
      v-if="markdown"
      :source="markdown"
      class="prose max-w-none flex-1 bg-slate-800 p-5 text-indigo-200 prose-headings:text-inherit prose-a:text-indigo-300 prose-a:underline-offset-4 prose-strong:text-inherit prose-em:text-inherit prose-code:text-inherit prose-code:before:hidden prose-code:after:hidden prose-pre:border prose-pre:border-dashed"
    />

    <div v-else class="flex-1 bg-gray-800" />
  </article>
</template>
