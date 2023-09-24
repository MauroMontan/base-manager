<script setup lang="ts">

interface Emits {
    (event: "toggle-overlay", data?: any): void
}

const emit = defineEmits<Emits>()

</script>
<template>
    <section @click.self="emit('toggle-overlay')" class="overlay">

        <slot></slot>
    </section>
</template>
<style scoped>
.overlay {
    background-color: var(--bg-color);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
</style>