<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const store = useSurveyStore()
</script>

<template>
  <div>
    <div v-if="store.survey">
      <SurveyComponent :model="store.survey" class="rounded-r" />
    </div>
  </div>
</template>
