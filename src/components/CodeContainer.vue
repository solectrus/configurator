<script setup lang="ts">
import { defineProps } from 'vue'
import CopyButton from '@/components/CopyButton.vue'

interface CodeContainerProps {
  language: string
  code: string
  filename: string
}

defineProps<CodeContainerProps>()
</script>

<template>
  <section class="space-y-5 rounded-bl bg-slate-200 px-0 py-5 text-sm lg:px-10">
    <header
      class="sticky top-0 flex items-end justify-between border-b-2 border-slate-800 bg-slate-200 py-2 text-center lg:text-left"
    >
      <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">{{ filename }}</h1>

      <CopyButton :text="code" />
    </header>

    <highlightjs :language="language" :code="code" />
  </section>
</template>
