import { createRouter, createWebHistory } from 'vue-router'
import homeComp from '../components/homeComp.vue'
import skillsComp from '../components/skillsComp.vue'
import experienceComp from '../components/experienceComp.vue'
import educationComp from '../components/educationComp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeComp
    },
    {
      path: '/skills',
      name: 'skills',
      component: skillsComp
    },
    {
      path: '/experience',
      name: 'experience',
      component: experienceComp
    },
    {
      path: '/education',
      name: 'education',
      component: educationComp
    }
  ]
})

export default router
