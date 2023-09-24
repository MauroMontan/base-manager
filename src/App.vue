<script setup lang="ts">
import HomePage from "./components/StartPage.vue"
import MainLayout from "./components/Layout.vue"
import RowPreview from "./components/RowPreview.vue";
import AddProjectFrom from "./components/AddProjectForm.vue"
import { CommandBuilder } from "./helpers/CommandBuilder.ts"
import { Ref, computed, onMounted, ref } from "vue";
import { Network } from "./helpers/Network.ts"
import { Utils } from "./utils/Utils.ts"
import ProjectBaseList from "./components/ProjectBaseList.vue";
import CommandTable from "./components/CommandTable.vue"

const net = new Network()
const utils = new Utils()

const lastTabIndex = ref(0)
const isOverlayOpen = ref(false)

const isProjectListInfoOpen = ref(false)
const isCommandTableOpen = ref(false)
const isFormModalOpen = ref(false)
const toggleProjectList = () => {
  isProjectListInfoOpen.value = !isProjectListInfoOpen.value
}
const toggleOverlay = () => {
  isOverlayOpen.value = !isOverlayOpen.value
}

const toggleProjectForm = async () => {
  isFormModalOpen.value = !isFormModalOpen.value
  if (isFormModalOpen.value) {
    projectList.value = await net.getProjectList()
  }
}

const toggleCommandTable = () => {
  isCommandTableOpen.value = !isCommandTableOpen.value
}

const closeAll = () => {
  isOverlayOpen.value = false
  isProjectListInfoOpen.value = false
  isCommandTableOpen.value = false
  isFormModalOpen.value = false
}

const keys: Ref<string[]> = ref([])

const currentBase = ref([])
const currentRow = ref({})

const projectList = ref([])
const currentProjectBaseList = ref([])
const currentSelectedProjectName = ref("")
const query = ref("")


const openBaseList = (project: any) => {
  currentSelectedProjectName.value = project["label"]
  currentProjectBaseList.value = project["bases"]
  toggleProjectList()
}

const setTableData = async (projectAlias: string, baseName: string) => {
  let project = projectList.value.filter(e => e["label"] === projectAlias)

  let projectKey = project[0]["projectkey"]
  net.setNewProject(projectKey)

  currentBase.value = await net.fetchData(baseName)
  keys.value = utils.getBasekeys(currentBase.value);

  isProjectListInfoOpen.value = false
}

const triggerCommand = async () => {

  const cmdBuilder = new CommandBuilder(query.value)

  if (cmdBuilder.command === "/add-project") {
    net.addNewProject({
      label: cmdBuilder.identifier,
      projectKey: cmdBuilder.data
    })
    query.value = ""
    projectList.value = await net.getProjectList()
  }

  if (cmdBuilder.command === "/display") {
    setTableData(cmdBuilder.identifier, cmdBuilder.data)
    query.value = ""
  }

  if (cmdBuilder.command === "/add-base") {
    let data = projectList.value.filter(e => e["label"] === cmdBuilder.identifier)
    let project = data[0]
    net.addBaseToProject(project, cmdBuilder.data)
    projectList.value = await net.getProjectList()
    query.value = ""
  }

  if (cmdBuilder.command === "/list-bases") {
    projectList.value = await net.getProjectList()
    let data = projectList.value.filter(e => e["label"] === cmdBuilder.identifier)
    let project = data[0]

    openBaseList(project)

    query.value = cmdBuilder.command
  }
  if (cmdBuilder.command === "/commands") {
    toggleCommandTable()
  }

}

const commandbar: Ref<HTMLElement | undefined> = ref()

const SelectRow = (row: any, index: number) => {
  lastTabIndex.value = index
  currentRow.value = row
  console.log(currentRow.value)
  toggleOverlay()
}

onMounted(async () => {

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll()
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey && e.key === "K") || (e.ctrlKey && e.key === "k")) {
      commandbar.value?.focus()
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey && e.key === "B") || (e.ctrlKey && e.key === "b")) {
      toggleCommandTable()
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey && e.key === "O") || (e.ctrlKey && e.key === "o")) {
      toggleProjectForm()
      e.preventDefault();
      return;
    }
  });

  projectList.value = await net.getProjectList()
  console.log(projectList.value)

})

const isbaseEmpty = computed(() => {
  return currentBase.value.length === 0
})



</script>

<template>
  <AddProjectFrom v-if="isFormModalOpen" @toggle-modal="toggleProjectForm"></AddProjectFrom>
  <CommandTable @toggle-modal="toggleCommandTable" v-if="isCommandTableOpen">
  </CommandTable>
  <ProjectBaseList :data="currentProjectBaseList" :project-name="currentSelectedProjectName" v-if="isProjectListInfoOpen"
    @toggle-modal="toggleProjectList" @open-base="setTableData" />

  <RowPreview :data="currentRow" v-if="isOverlayOpen" @toggle-modal="toggleOverlay" />
  <MainLayout>

    <template v-slot:table>
      <div class="empty-label" v-if="isbaseEmpty">
        <HomePage></HomePage>

      </div>
      <table v-else>
        <tr>
          <th v-for="key in keys">{{ key }}</th>
        </tr>
        <tr @click="SelectRow(record, i)" @keyup.enter="SelectRow(record, i)" v-for="record, i in currentBase"
          :tabindex="i">
          <td v-for=" key in keys">
            {{ record[key] }}
          </td>
        </tr>
      </table>
    </template>

    <template v-slot:info>
      <fieldset>
        <legend>base info</legend>
        <ul class="list-info">
          <li>Records Count: {{ currentBase.length }}</li>
          <li>Column Count: {{ keys.length }}</li>
          <li>File size: {{ utils.getJsonSize(currentBase).toFixed() }} Kb </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>projects</legend>
        <div class="empty-label" v-if="projectList.length === 0">
          <img class="floating" src="./assets/folder.gif" alt="empty-image">
        </div>
        <ul v-else>
          <li @click="openBaseList(project)" v-for="project in projectList">{{ project["label"] }}</li>

        </ul>
      </fieldset>
    </template>
    <template v-slot:commandBar>
      <h1 class="blink">>></h1> <input v-model="query" @keyup.enter="triggerCommand" placeholder="CRLT+K to focus"
        ref="commandbar" type="text">
    </template>

  </MainLayout>
</template>


<style scoped>
table {
  font-size: 12px;
  border-collapse: collapse;
  min-height: 100%;
  min-width: 100%;
}

.empty-label {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating {
  animation: floating 1.5s infinite;
}

img {
  width: 60%;
  height: 60%;
  object-fit: contain;

}

.list-info li {
  background-color: unset;
}

tr,
td,
th {
  padding-inline: 0.5rem;
  border-bottom: solid 1px;
  border-right: solid 1px;
}

th {
  padding: 1rem;
  position: -webkit-sticky;
  max-height: 3rem;
  /* Safari */
  position: sticky;
  top: 0;
  background-color: var(--color);
  color: var(--bg-color);

}

tr:nth-child(even) {

  background-color: var(--row-even-color);
}


.blink {
  animation: blink 1s infinite;
}

input[type="text"] {
  background-color: transparent;
  border: solid 1px;
  border-radius: 0.5rem;
  color: var(--color);
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  font-size: 20px;
  caret-color: red;
  caret-shape: underscore;
}

input[type="text"]::before {
  content: ">>";
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

fieldset {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: solid 1px;
  position: relative;
  display: flex;
  align-items: start;
  padding: 1rem;
  overflow: scroll;
}

fieldset ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

fieldset ul li {
  list-style: none;
  background-color: rgb(0, 0, 0, 0.1);
  padding: 0.4rem;
  border-radius: 0.2rem;
  width: 100%;
  cursor: default;
}

li>* {
  cursor: default;
}

@keyframes floating {
  from {
    transform: translateY(0.5rem);
  }

  50% {
    transform: translateY(0);
  }

  to {
    transform: translateY(0.5rem);
  }
}


fieldset legend {
  background-color: var(--bg-color);
}
</style>