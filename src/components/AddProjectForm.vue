<script setup lang="ts">
import { ref } from "vue";
import { Network } from "../helpers/Network";
import Overlay from "./overlay.vue"


const net = new Network();
const commandString = ref("/add-project")
const project = ref({
  projectkey: "",
  label: ""
})

interface Emits {
  (event: "toggle-modal", data?: any): void
}

const emit = defineEmits<Emits>()

const submit = () => {
  if (project.value.label != "") {
    if (project.value.projectkey != "") {
      net.addNewProject({
        label: project.value.label,
        projectkey: project.value.projectkey
      })
      emit("toggle-modal")
    } else {
      alert("insert valid project key")
    }
  } else {
    alert("insert valid label")
  }
}

</script>
<template>
  <Overlay @toggle-overlay="emit('toggle-modal')">
    <div class="command-example">
      <h6>
        Command example: {{ " " + commandString + " " + project.label + " " + project.projectkey }} </h6>

    </div>
    <div class="box">

      <form>
        <label for="project-alias">
          <p>Alias</p>
          <input v-model="project.label" tabindex="1" id="project-alias" name="project-alias" type="text"
            placeholder="Example: cat-database (dont use spaces)">
        </label>

        <label for="project-key">
          <p> Project Key</p>
          <input v-model="project.projectkey" @keyup.enter="submit" tabindex="2" id="project-key" name="project-key"
            type="text" placeholder="DETA PROJECT-KEY">
        </label>
        <h3 v-if="project.projectkey.length > 6">PRESS ENTER TO SUBMIT</h3>
      </form>

    </div>
    <p class="close-tag">Press ESC to exit</p>
  </Overlay>
</template>

<style scoped>
.box {
  border-radius: 0.5rem;
  width: 30%;
  height: 16rem;
  padding: 2rem;
  border: solid 1px;
}

p {
  width: 35%;
}

.close-tag {
  text-align: center;
}

.command-example {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.3rem;
  bottom: 0;
  padding: 2rem;
  position: absolute;
}

input[type="text"] {
  background-color: transparent;
  border: solid 1px var(--color);
  color: var(--color);
  height: 2rem;
  font-size: 1.1rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0.3rem;
}


label {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.box form {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 2rem;
}

@media (max-width: 768px) {
  .box {
    width: 60%;
  }

  .command-example {
    font-size: 0.8rem;
  }
}
</style>