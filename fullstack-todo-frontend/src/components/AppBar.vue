<script setup lang="ts">
import {RouterLink} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

</script>

<template>
  <header class="appbar">
    <nav class="appbar__nav">
      <RouterLink to="/" class="appbar__link">Home</RouterLink>
      <RouterLink to="/auth" class="appbar__link">Auth</RouterLink>
    </nav>

    <font-awesome-icon :icon="faUser" class="appbar__icon"/>
  </header>
</template>

<style scoped lang="scss">
.appbar {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__nav {
    display: flex;
    gap: 20px;
  }

  &__link {
    text-decoration: none;
    color: var(--color-text);
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: var(--color-green);
    }
  }

  &__icon {
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--color-green);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    &__nav {
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    &__link {
      text-align: left;
    }
  }
}
</style>
