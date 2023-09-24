
<script setup lang="ts">
import DetaLogo from "./DetaLogo.vue"
</script>
<template>
  <div class="banner crt">
    <h1>BASE MANAGER</h1>
    <div class="head">
      <DetaLogo></DetaLogo>
      <h3>powered by deta</h3>
    </div>
    <ol>
      <li>Add your project: /add-project ALIAS PROJECT-KEY</li>
      <li>Add a base to your project (optional): /add-base ALIAS BASE-NAME </li>
      <li>Visualize your data: /display ALIAS BASE-NAME </li>
      <li> CTRL + B for more information </li>
    </ol>

    <p>* Adding base names is for "/list-bases ALIAS" <br> in case you want to
      store and read bases related to your project</p>

    <h1></h1>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
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

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>