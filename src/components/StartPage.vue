<script setup lang="ts">
import DetaLogo from "./DetaLogo.vue"
</script>
<template>
  <div class="banner">
    <h1>BASE MANAGER</h1>
    <div class="head">
      <DetaLogo></DetaLogo>
      <h3>powered by deta</h3>
    </div>
    <p>Use CTRL + O to add a project and CTRL + I to add bases o
      (adding a base needs a project )
      or follow the next steps to add it with commands!</p>
    <ol>
      <li>Add your project: /add-project ALIAS PROJECT-KEY</li>
      <li>Add existing base to your project: /add-base ALIAS BASE-NAME </li>
      <li>Visualize your data: /display ALIAS BASE-NAME </li>

    </ol>
    <h3> *CTRL + B for more information </h3>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 3.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

}

ol {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;
}

p {
  text-align: center;
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 3rem;
  animation: textShadow 1s infinite;
}
</style>