<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import './App.css'

export default {
  setup() {

    const fileInput = ref(null)
    let image = ref(null)
    let showElement = ref(true)
    let showButton = ref(false)

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileInput = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          image.value = e.target.result
        }
        reader.readAsDataURL(file)
        showElement.value = false
      }
    }

    const removeImage = () => {
      image.value = null
      showElement.value = true
      hideButtonHandler
    }

    const showButtonHandler = () => {
      showButton.value = true
    }

    const hideButtonHandler = () => {
      showButton.value = false
    }


    return {
      RouterLink,
      RouterView,
      fileInput,
      image,
      showElement,
      showButton,
      triggerFileInput,
      handleFileInput,
      removeImage,
      showButtonHandler,
      hideButtonHandler
    }
  }
}

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
      <input type="file" ref="fileInput" @change="handleFileInput" style="display: none;">
      <button @click="triggerFileInput" v-if="showElement">Profilbild hinzufügen</button>
      <div class="container-picture">
        <img :src="image" @mouseover="showButtonHandler" @mouseleave="hideButtonHandler" v-if="image" class="person-picture">
        <button @click="removeImage" @mouseover="showButtonHandler" class="button-remove" :class="{ 'visible': showButton }">X</button>
      </div>
    </div>
  </div>
</template>

<style>

</style>
