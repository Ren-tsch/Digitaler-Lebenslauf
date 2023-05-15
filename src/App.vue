<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './App.css'

</script>

<template>
  <div class="container">
    <div class="block-left">
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/info">Info</RouterLink></li>
          <li><RouterLink to="/skills">Fachkenntnisse</RouterLink></li>
          <li><RouterLink to="/experience">Erfahrung</RouterLink></li>
          <li><RouterLink to="/education">Ausbildung</RouterLink></li>
        </ul>
      </nav>
      <RouterView></RouterView>
    </div>
    <div class="block-right">
      <img src="" class="person-picture">
    </div>
  </div>
</template>

<style>

</style>
