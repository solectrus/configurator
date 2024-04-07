<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  text: string
  filename: string
}

const props = defineProps<Props>()
const copied = ref(false)

const copyTextToClipboard = async () => {
  if (props.text) {
    await navigator.clipboard.writeText(props.text)

    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}

const downloadAsFile = () => {
  if (props.text) {
    const element = document.createElement('a')
    const file = new Blob([props.text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = props.filename
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
    document.body.removeChild(element)
  }
}
</script>

<template>
  <div class="flex items-end gap-2 rounded bg-[#22272e] p-1">
    <div v-if="copied" class="flex select-none items-end gap-2 font-sans text-sm text-green-300">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>

      Copied!
    </div>

    <button v-else @click="copyTextToClipboard" class="text-slate-300" title="Copy to clipboard">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
        />
      </svg>
    </button>

    <button @click="downloadAsFile" class="text-slate-300" title="Download as file">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    </button>
  </div>
</template>
