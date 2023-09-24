<script setup lang="ts">
import Overlay from "./overlay.vue"



interface Props {
  data: any
}

const props = defineProps<Props>()

let { data } = props



interface Emits {
  (event: "toggle-modal", data?: any): void
}

const emit = defineEmits<Emits>()

</script>
<template>
  <Overlay @toggle-overlay="emit('toggle-modal')">

    <div class="box">

      <table>
        <tr v-for="item, index in data">
          <th>{{ index }}</th>
          <th>
            <a v-if="item.toString().startsWith('http')" :href="item">
              {{ item }}</a>
            <p v-else>{{ item }}</p>
          </th>
        </tr>
      </table>

    </div>
    <p>Press ESC to exit</p>
  </Overlay>
</template>

<style scoped>
.box {
  max-width: 80%;
  border-radius: 0.5rem;
  overflow: scroll;
  max-height: 90%;
  border: solid 1px;
  display: flex;
  flex-direction: column;
}

table {
  border-collapse: collapse;
  width: 100%;
}

tr,
td,
th {
  padding: 0.5rem;
  text-align: left;

}

tr {
  border-bottom: solid 1px;
}

tr:last-child {
  border-bottom: solid 5px transparent;
}

th:nth-child(1) {
  border-right: solid 1px;
}
</style>