<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import './assets/App.css'

export default {
  setup() {

    const fileInput = ref(null)
    let image = ref(null)
    let showAddButton = ref(true)
    let showRemoveButton = ref(false)

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileInput = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = e.target.result
          localStorage.setItem('image', imageData)
          image.value = imageData
        }
        reader.readAsDataURL(file)
        showAddButton.value = false
      }
    }

    const loadImage = () => {
      const storedImage = localStorage.getItem('image')
      image.value = storedImage
      if (storedImage) {
        showAddButton.value = false
      }
    }

    const removeImage = () => {
      image.value = null
      showAddButton.value = true
      hideButtonHandler()
    }

    const showButtonHandler = () => {
      showRemoveButton.value = true
    }

    const hideButtonHandler = () => {
      showRemoveButton.value = false
    }

    loadImage()


    return {
      RouterLink,
      RouterView,
      fileInput,
      image,
      showElement: showAddButton,
      showButton: showRemoveButton,
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
        <ul class="navbar">
          <li class="nav-link" :class="{ active: $route.path === '/' }"><RouterLink to="/">Home</RouterLink></li>
          <li class="nav-link" :class="{ active: $route.path === '/skills' }"><RouterLink to="/skills">Fachkenntnisse</RouterLink></li>
          <li class="nav-link" :class="{ active: $route.path === '/experience' }"><RouterLink to="/experience">Erfahrung</RouterLink></li>
          <li class="nav-link" :class="{ active: $route.path === '/education' }"><RouterLink to="/education">Ausbildung</RouterLink></li>
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
