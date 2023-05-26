<script>
import { reactive, ref } from 'vue';
import useExpStore from '../stores/expStore'

export default {
    setup() {
        const { experiences, loadExp, addExp, deleteExp, adjustExp } = useExpStore()
        let newExp = reactive({
            employer: '',
            jobTitle: '',
            dateFrom: '',
            dateTo: '',
            tasks: []
        })

        let tasksArray = reactive([])
        const task = ref('')
        let changeExp = ref(false)
        let isVisible = ref(false)
        let changeTask = ref(false)
        let isFinished = ref(false)
        let showButton = ref(false)

        function AddNewTask() {
            if (task.value != '') {
                tasksArray.push(task.value)
                task.value = ''
            }
            
            if (tasksArray.length > 0) {
                isVisible.value = true
            }
        }

        function deleteTask(element) {
            let index = tasksArray.findIndex(obj => obj === element)
            tasksArray.splice(index, 1)

            if (tasksArray.length == 0) {
                isVisible.value = false
            }

            let storageIndex = localStorage.getItem('adjustTaskData')
            if (storageIndex != null & index == storageIndex) {
                task.value = ''
                changeTask.value = false
                localStorage.removeItem('adjustTaskData')
            }
        }

        function adjustTask(element) {
            let index = tasksArray.findIndex(obj => obj === element)
            task.value = tasksArray[index]

            if (task.value != '') {
                tasksArray[index] = task.value
            }

            changeTask.value = true
            localStorage.setItem('adjustTaskData', index)
        }

        function changeTaskContent() {
            let index = JSON.parse(localStorage.getItem('adjustTaskData'))
            tasksArray.splice(index, 1, task.value)
            localStorage.removeItem('adjustTaskData')
            task.value = ''
            changeTask.value = false
        }

        function addNewExp() {
            if (tasksArray.length > 0) {
                newExp.tasks = tasksArray
                addExp(newExp)

                for (const key in newExp) {
                    if (Object.prototype.hasOwnProperty.call(newExp, key)) {
                        newExp[key] = ''
                    }
                }

                tasksArray.splice(0, tasksArray.length)
                loadExp()
            }
        }

        function deleteNewExperience(position) {
            deleteExp(position)
            changeExp.value = false

            for (const key in newExp) {
                if (Object.prototype.hasOwnProperty.call(newExp, key)) {
                    newExp[key] = ''
                }
            }

            tasksArray.splice(0, tasksArray.length)
            loadExp()
        }

        function adjustNewExp(position) {
            adjustExp(position)
            changeExp.value = true
            const changeArray = JSON.parse(localStorage.getItem('adjustExperienceData'))
            newExp.employer = changeArray[0].employer
            newExp.jobTitle = changeArray[0].jobTitle
            newExp.dateFrom = changeArray[0].dateFrom
            newExp.dateTo = changeArray[0].dateTo

            for (let i = 0; i < changeArray[0].tasks.length; i++) {
                tasksArray[i] = changeArray[0].tasks[i]
            }

            if (tasksArray.length > 0) {
                isVisible.value = true
            }
        }

        function changeExpContent() {
            const expArray = JSON.parse(localStorage.getItem('experiences'))
            const changeArray = JSON.parse(localStorage.getItem('adjustExperienceData'))

            expArray.splice(changeArray[0].index, 1, {
                id: changeArray[0].id,
                employer: newExp.employer,
                jobTitle: newExp.jobTitle,
                dateFrom: newExp.dateFrom,
                dateTo: newExp.dateTo,
                tasks: tasksArray
            })

            localStorage.setItem('experiences', JSON.stringify(expArray))
            localStorage.removeItem('adjustExperienceData')

            newExp.employer = ''
            newExp.jobTitle = ''
            newExp.dateFrom = ''
            newExp.dateTo = ''
            changeExp.value = false
            tasksArray.splice(0, tasksArray.length)
            isVisible.value = false
            loadExp()
        }

        function finishExp() {
            if (localStorage.getItem('experiences') != null) {
                isFinished.value = true
                updateExpPageState()
                orderCardsByDate()
            }
        }

        function showButtonHandler() {
            showButton.value = true
        }

        function hideButtonHandler() {
            showButton.value = false
        }

        function backToAdjust() {
            isFinished.value = false
            updateExpPageState()
        }

        function loadPageState() {
            isFinished.value = JSON.parse(localStorage.getItem('experiencePageState'))
        }

        function updateExpPageState() {
            localStorage.setItem('experiencePageState', isFinished.value.toString())
        }

        function orderCardsByDate() {
            const expArray = JSON.parse(localStorage.getItem('experiences'))
            expArray.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
            expArray.reverse()
            localStorage.setItem('experiences', JSON.stringify(expArray))
            loadExp()
        }

        loadPageState()
        loadExp()


        return {
            experiences,
            newExp,
            tasksArray,
            task,
            changeExp,
            isVisible,
            changeTask,
            isFinished,
            showButton,
            loadExp,
            addExp,
            deleteExp,
            AddNewTask,
            deleteTask,
            adjustTask,
            changeTaskContent,
            addNewExp,
            deleteNewExperience,
            adjustNewExp,
            changeExpContent,
            finishExp,
            showButtonHandler,
            hideButtonHandler,
            backToAdjust,
            loadPageState,
            updateExpPageState,
            orderCardsByDate
        }
    }
}

</script>

<template>
    <div class="nav-top-margin"></div>
    <div class="container-exp" v-if="!isFinished">
        <div class="exp-card">
            <form @submit.prevent="addNewExp">
                <h3>Arbeitsort hinzufügen</h3>
                <div class="form-row">
                    <div>
                        <label>Arbeitgeber:</label>
                        <input type="text" v-model="newExp.employer" required>
                    </div>  
                    <div>  
                        <label>Angestellt als:</label>
                        <input type="text" v-model="newExp.jobTitle" required>
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label>Datum von:</label>
                        <input type="date" v-model="newExp.dateFrom" required>
                    </div>
                    <div>
                        <label>bis:</label>
                        <input type="date" v-model="newExp.dateTo" required>
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label>Aufgaben:</label>
                        <input type="text" v-model="task">
                        <button @click="AddNewTask" type="button" v-if="!changeTask">Hinzufügen</button>
                        <button @click="changeTaskContent" type="button" v-if="changeTask">Ändern</button>
                    </div>
                </div>

                <div>
                    <button type="submit"  v-if="!changeExp">Karte hinzufügen</button>
                    <button type="button" v-if="!changeExp" @click="finishExp">Fertig</button>
                    <button type="button" v-if="changeExp" @click="changeExpContent">Ändern</button>
                </div>
            </form>
        </div>
        <div class="exp-taskslist" v-if="isVisible">
            <h3 style="margin-bottom: 0;">Aufgaben</h3>
            <ul>
                <li v-for="element in tasksArray" :key="element">
                    {{ element }}
                    <button @click="deleteTask(element)">Löschen</button>
                    <button @click="adjustTask(element)">Bearbeiten</button>
                </li>
            </ul>
        </div>
    </div>
    <div class="container-subsite" :style="{height: isFinished ? '92.5vh' : '0vh'}">
        <div class="exp-cardbox" :style="{ position: isFinished ? 'relative' : 'fixed' , height: isFinished ? 'unset' : '65vh'}" @mouseover="showButtonHandler" @mouseout="hideButtonHandler">
            <div class="exp-cardcontent" v-for="exp in experiences" :key="exp.id">
                <div class="exp-cardcontent-left">
                    {{ exp.dateFrom }} bis<br> {{ exp.dateTo }}
                </div>
                <div class="exp-cardcontent-right">
                    <p style="text-align: center;">{{ exp.employer }}</p>
                    <p style="font-weight: bold; text-align: center;">{{ exp.jobTitle }}</p>
                    <ul>
                        <li v-for="task in exp.tasks" :key="task">
                            {{ task }}
                        </li>
                    </ul>
                    <div style="display: flex; flex-direction: row;" v-if="!isFinished">
                        <button style="width: fit-content;" @click="adjustNewExp(exp.id)">Bearbeiten</button>
                        <button style="width: fit-content;" @click="deleteNewExperience(exp.id)">Löschen</button>
                    </div>
                </div>
            </div>
            <button @click="backToAdjust()" class="button-remove" :class="{ 'visible': showButton }" v-if="isFinished">X</button>
        </div>
    </div>
</template>

<style></style>