<script setup lang="ts"></script>
<template>
  <section class="main-layout">
    <div class="display ">

      <div class="table">
        <slot name="table"></slot>
      </div>

      <div class="info">
        <slot name="info">

        </slot>
      </div>

    </div>
    <div class="command-bar ">
      <div class="prompt">
        <slot name="commandBar"></slot>
      </div>

      <div class="command-list ">
        <div class=" command-tag">
          <div class="key-combo">
            <div class="key-cap long-key">ctrl</div> + <div class="key-cap">B</div>
          </div>
          <p>Open command table</p>
        </div>
        <div class=" command-tag">
          <div class="key-combo">
            <div class="key-cap long-key">ctrl</div> + <div class="key-cap">G</div>
          </div>
          <p>Open settings</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  padding: 1rem;
}

.table {
  height: 100%;
  width: 70%;
  max-width: 70%;
  overflow: auto;
  min-width: 40%;
  border: solid 1px;
  border-radius: 0.5rem;

}

.display {
  height: 90%;
  display: flex;
  gap: 1rem;
}

.info {
  display: flex;
  padding: 0;
  width: 30%;
  height: 100%;
  flex-direction: column;
}

.command-bar {
  height: 10%;
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  padding-inline-start: 0.5rem;
  justify-content: start;
}

.key-cap {
  font-size: 1rem;
  padding: 1rem;
  border-radius: 0.2rem;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: var(--color);
  opacity: 0.7;
}

.long-key {
  font-size: 0.6rem !important;
}

.prompt {

  display: flex;
  height: 100%;
  width: 70%;
  gap: 1rem;
  align-items: center;
  justify-content: center;

}

.command-list {
  font-size: 0.8rem;
  width: 30%;
  display: flex;
  gap: 0.5rem;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
}

.key-combo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.command-tag {
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1rem;
  border: solid 1px;
  align-items: center;
  justify-content: center;

}
</style>