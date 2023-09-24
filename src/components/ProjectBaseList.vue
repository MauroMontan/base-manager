<script setup lang="ts">
import Overlay from "./overlay.vue"

interface Props {
  data: any,
  projectName: string
}

const props = defineProps<Props>()

let { data, projectName } = props


interface Emits {
  (event: "toggle-modal", data?: any): void
  (event: "open-base", projectName: string, baseName: string): void
}

const emit = defineEmits<Emits>()



</script>
<template>
  <Overlay @toggle-overlay="emit('toggle-modal')">

    <fieldset class="box">
      <legend>{{ projectName }} bases</legend>
      <ul>
        <li @click="emit('open-base', projectName, base)" v-for="base in data">{{ base }}</li>
      </ul>
    </fieldset>

  </Overlay>
</template>
<style scoped>
.box {
  width: 40%;
  border-radius: 0.5rem;
  overflow: hidden;
  height: fit-content;
  min-height: 30%;
  max-height: 90%;
  padding: 1rem;
  overflow: scroll;
  border-color: var(--color);
}

legend {
  font-size: 20px;
  text-align: center;
  background-color: var(--bg-color);
}

.box ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.box ul li {
  list-style: none;
  width: 100%;
  border-radius: 0.3em;
  padding: 0.3rem;
}

li,
li>* {
  cursor: default;
}
</style>