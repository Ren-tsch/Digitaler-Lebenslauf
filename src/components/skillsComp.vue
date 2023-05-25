<script>
import { reactive, ref } from 'vue'
import useSkillsStore from '../stores/skillsStore';

export default {

    setup() {
        const { skills, loadSkills, addSkill, deleteSkill, adjustSkill } = useSkillsStore()
        let newSkill = reactive({
            title: '',
            content: ''
        })

        let changeSkill = ref(false)
        let isFinished = ref(false)
        let showButton = ref(false)

        function addNewSkill() {
            if (newSkill.title != '' & newSkill.content != '') {
                addSkill(newSkill)
                newSkill.title = '',
                newSkill.content = ''
            }
        }

        function deleteNewSkill(position) {
            deleteSkill(position)
            loadSkills()
        }

        function adjustNewSkill(position) {
            adjustSkill(position)
            changeSkill.value = true
            const changeArray = JSON.parse(localStorage.getItem('adjustSkillData'))
            newSkill.title = changeArray[0].title
            newSkill.content = changeArray[0].content
        }

        function changeSkillContent() {
            const skillsArray = JSON.parse(localStorage.getItem('skills'))
            const changeArray = JSON.parse(localStorage.getItem('adjustSkillData'))

            skillsArray.splice(changeArray[0].index, 1, {
                id: changeArray[0].id,
                title: newSkill.title,
                content: newSkill.content
            })

            localStorage.setItem('skills', JSON.stringify(skillsArray))

            newSkill.title = ''
            newSkill.content = ''
            changeSkill.value = false
            loadSkills()
        }

        function finishSkills() {
            isFinished.value = true
            updateSkillPageState()
        }

        function showButtonHandler() {
            showButton.value = true
        }

        function hideButtonHandler() {
            showButton.value = false
        }

        function backToAdjust() {
            isFinished.value = false
            updateSkillPageState()
        }

        function loadPageState() {
            isFinished.value = localStorage.getItem('skillPageState')
        }

        function updateSkillPageState() {
            localStorage.setItem('skillPageState', isFinished.value.toString())
        }

        loadSkills()
        loadPageState()

        return {
            skills,
            newSkill,
            changeSkill,
            isFinished,
            showButton,
            addNewSkill,
            deleteNewSkill,
            adjustNewSkill,
            changeSkillContent,
            finishSkills,
            showButtonHandler,
            hideButtonHandler,
            backToAdjust,
            loadPageState,
            updateSkillPageState
        }
    }
}

</script>

<template>
    <div class="skill-container" v-if="!isFinished">
        <form class="skill-form" @submit.prevent="addNewSkill">
            <div>
                <label>Fähigkeitsgebiet:</label>
                <input v-model="newSkill.title" type="text">
            </div>

            <div>
                <label>Beschreibung der Skills:</label>
                <input v-model="newSkill.content" class="input-textarea">
            </div>

            <div class="add-button">
                <button v-if="!changeSkill" type="submit">Hinzufügen</button>
                <button v-if="changeSkill" type="submit" @click="changeSkillContent()">Ändern</button>
                <button v-if="!changeSkill" @click="finishSkills">Fertig</button>
            </div>
        </form>
    </div>
    <div :class="{ 'container-subsite': isFinished}">
        <ul class="card" @mouseover="showButtonHandler" @mouseout="hideButtonHandler">
            <li v-for="skill in skills" :key="skill.id" class="skill-li">
                <div>
                    <p class="skill-title">{{ skill.title }}</p>
                    <p class="skill-content">{{ skill.content }}</p>
                </div>
                <div class="skill-buttons" v-if="!isFinished">
                    <button @click="deleteNewSkill(skill.id)">Löschen</button>
                    <button @click="adjustNewSkill(skill.id)">Anpassen</button>
                </div>
            </li>
            <button @click="backToAdjust()" class="button-remove" :class="{ 'visible': showButton }" v-if="isFinished">X</button>
        </ul>
    </div>
</template>

<style></style>