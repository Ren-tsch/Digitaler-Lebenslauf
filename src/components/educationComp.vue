<script>
import { reactive, ref} from 'vue';
import useEduStore from '../stores/eduStore'

export default {
    setup() {
        const { educations, loadEducation, addEducation, deleteEducation, adjustEducation, publicServices, loadPublicService, addPublicService, deletePublicService, adjustPublicService } = useEduStore()
        let newEducation = reactive({
            description: '',
            dateFrom: '',
            dateTo: ''
        })

        let newPubService = reactive({
            description: '',
            dateFrom: '',
            dateTo: '',
        })

        let combinedArray = ref([])

        let changeEducation = ref(false)
        let changePublicService = ref(false)
        let isFinished = ref(false)
        let showButton = ref(false)

        function addNewEducation() {
            addEducation(newEducation)
            for (const key in newEducation) {
                if (Object.prototype.hasOwnProperty.call(newEducation, key)) {
                    newEducation[key] = ''
                }
            }
        }

        function deleteNewEducation(position) {
            deleteEducation(position)

            if (changeEducation.value) {
                for (const key in newEducation) {
                    if (Object.prototype.hasOwnProperty.call(newEducation, key)) {
                        newEducation[key] = ''
                    }
                }
            }

            changeEducation.value = false
            loadEducation()
        }

        function adjustNewEducation(position) {
            adjustEducation(position)
            changeEducation.value = true

            const changeArray = JSON.parse(localStorage.getItem('adjustEducationData'))

            newEducation.description = changeArray[0].description
            newEducation.dateFrom = changeArray[0].dateFrom
            newEducation.dateTo = changeArray[0].dateTo
        }

        function changeEducationContent() {
            const eduArray = JSON.parse(localStorage.getItem('educations'))
            const changeArray = JSON.parse(localStorage.getItem('adjustEducationData'))

            eduArray.splice(changeArray[0].index, 1, {
                id: changeArray[0].id,
                description: newEducation.description,
                dateFrom: newEducation.dateFrom,
                dateTo: newEducation.dateTo,
            })

            localStorage.setItem('educations', JSON.stringify(eduArray))
            localStorage.removeItem('adjustEducationData')

            newEducation.description = ''
            newEducation.dateFrom = ''
            newEducation.dateTo = ''
            changeEducation.value = false
            loadEducation()
        }

        function addNewPublicService() {
            addPublicService(newPubService)

            for (const key in newPubService) {
                if (Object.prototype.hasOwnProperty.call(newPubService, key)) {
                    newPubService[key] = ''
                }
            }
        }

        function deleteNewPublicService(position) {
            deletePublicService(position)

            if (changePublicService.value) {
                for (const key in newPubService) {
                    if (Object.prototype.hasOwnProperty.call(newPubService, key)) {
                        newPubService[key] = ''
                    }
                }
            }

            changePublicService.value = false
            loadPublicService()
        }

        function adjustNewPublicService(position) {
            adjustPublicService(position)
            changePublicService.value = true

            const changeArray = JSON.parse(localStorage.getItem('adjustPublicServiceData'))

            newPubService.description = changeArray[0].description
            newPubService.dateFrom = changeArray[0].dateFrom
            newPubService.dateTo = changeArray[0].dateTo
        }

        function changePublicServiceContent() {
            const psArray = JSON.parse(localStorage.getItem('publicServices'))
            const changeArray = JSON.parse(localStorage.getItem('adjustPublicServiceData'))

            psArray.splice(changeArray[0].index, 1, {
                id: changeArray[0].id,
                description: newPubService.description,
                dateFrom: newPubService.dateFrom,
                dateTo: newPubService.dateTo
            })

            localStorage.setItem('publicServices', JSON.stringify(psArray))
            localStorage.removeItem('adjustPublicServiceData')

            newPubService.description = ''
            newPubService.dateFrom = ''
            newPubService.dateTo = ''
            changePublicService.value = false
            loadPublicService()
        }

        function finishEdu() {
            if ((localStorage.getItem('educations') || localStorage.getItem('publicServices')) != null) {
                isFinished.value = true
                updateEduPageState()
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
            updateEduPageState()
        }

        function loadPageState() {
            isFinished.value = JSON.parse(localStorage.getItem('educationPageState'))
            combinedArray.value = JSON.parse(localStorage.getItem('orderedEducationArray'))
        }

        function updateEduPageState() {
            localStorage.setItem('educationPageState', isFinished.value.toString())
        }

        function orderCardsByDate() {
            let educationArray = []
            let publicServicesArray = []

            if (localStorage.getItem('educations') != null) {
                educationArray = JSON.parse(localStorage.getItem('educations'))

                for (let i = 0; i < educationArray.length; i++) {
                    educationArray[i].type = 'education'
                }
            }

            if (localStorage.getItem('publicServices') != null) {
                publicServicesArray = JSON.parse(localStorage.getItem('publicServices'))

                for (let i = 0; i < publicServicesArray.length; i++) {
                    publicServicesArray[i].type = 'publicService'
                }
            }

            combinedArray.value = educationArray.concat(publicServicesArray)

            combinedArray.value.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
            combinedArray.value.reverse()

            localStorage.setItem('orderedEducationArray', JSON.stringify(combinedArray.value))
        }

        loadEducation()
        loadPublicService()
        loadPageState()

        return {
            combinedArray,
            educations,
            publicServices,
            newEducation,
            newPubService,
            changeEducation,
            changePublicService,
            isFinished,
            showButton,
            adjustEducation,
            loadEducation,
            addEducation,
            deleteEducation,
            adjustPublicService,
            loadPublicService,
            addPublicService,
            deletePublicService,
            addNewEducation,
            deleteNewEducation,
            adjustNewEducation,
            changeEducationContent,
            addNewPublicService,
            deleteNewPublicService,
            adjustNewPublicService,
            changePublicServiceContent,
            finishEdu,
            showButtonHandler,
            hideButtonHandler,
            backToAdjust,
            loadPageState,
            updateEduPageState,
        }
    }
}
</script>

<template>
    <div class="nav-top-margin"></div>
    <div class="container-exp" v-if="!isFinished">
        <div class="exp-card" style="width: 50%;">
            <form @submit.prevent="addNewEducation">
                <h3>Aus- und Weiterbildung hinzufügen</h3>
                <div class="form-row">
                    <div>
                        <label for="bezeichnung">Bezeichnung:</label>
                        <input id="bezeichnung" type="text" v-model="newEducation.description" required>
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label for="datum">Datum von:</label>
                        <input id="datum" type="month" v-model="newEducation.dateFrom" required>
                    </div>
                </div>

                <div class="form-row">
                        <div>
                            <label for="datumBis">Datum bis:</label>
                            <input id="datumBis" type="month" v-model="newEducation.dateTo" required>
                        </div>
                    </div>

                <div>
                    <button type="submit" v-if="!changeEducation">Hinzufügen</button>
                    <button type="button" v-if="changeEducation" @click="changeEducationContent">Ändern</button>
                    <button type="button" v-if="!changeEducation" @click="finishEdu">Fertig</button>
                </div>
            </form>
        </div>


        <div class="exp-card" style="width: 50%;">
            <form @submit.prevent="addNewPublicService">
                <h3>Landesdienst hinzufügen</h3>
                <div class="form-row">
                    <div>
                        <label for="dienstbezeichnung">Dienstbezeichnung:</label>
                        <input id="dienstbezeichnung" type="text" v-model="newPubService.description" required>
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label>Datum von:</label>
                        <input type="month" v-model="newPubService.dateFrom" required>
                    </div>
                </div>

                <div class="form-row">
                        <div>
                            <label>Datum bis:</label>
                            <input type="month" v-model="newPubService.dateTo" required>
                        </div>
                    </div>

                <div>
                    <button type="submit" v-if="!changePublicService">Hinzufügen</button>
                    <button type="button" v-if="changePublicService" @click="changePublicServiceContent">Ändern</button>
                    <button type="button" v-if="!changeEducation" @click="finishEdu">Fertig</button>
                </div>
            </form>
        </div>
    </div>
<div class="container-subsite" :style="{ height: isFinished ? '92.5vh' : '0vh' }">
    <div class="exp-cardbox" :style="{ position: isFinished ? 'relative' : 'fixed', height: isFinished ? 'unset' : '65vh' }" @mouseover="showButtonHandler" @mouseout="hideButtonHandler">
        <div v-if="!isFinished">
            <div class="exp-cardcontent" v-for="edu in educations" :key="edu.id">
                <div class="exp-cardcontent-left">
                    {{ edu.dateFrom }} bis {{ edu.dateTo }}
                </div>
                <div class="exp-cardcontent-right">
                    <p>{{ edu.description }}</p>
                    <div style="display: flex; flex-direction: row;">
                        <button style="width: fit-content;" @click="deleteNewEducation(edu.id)" v-if="!isFinished">Löschen</button>
                        <button style="width: fit-content;" @click="adjustNewEducation(edu.id)" v-if="!isFinished">Bearbeiten</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isFinished">
            <div class="exp-cardcontent" v-for="pubServ in publicServices" :key="pubServ.id" style="background-color: #90a68e;">
                <div class="exp-cardcontent-left">
                    {{ pubServ.dateFrom }} bis {{ pubServ.dateTo }}
                </div>
                <div class="exp-cardcontent-right">
                    <p>{{ pubServ.description }}</p>
                    <div style="display: flex; flex-direction: row;">
                        <button style="width: fit-content;" @click="deleteNewPublicService(pubServ.id)" v-if="!isFinished">Löschen</button>
                        <button style="width: fit-content;" @click="adjustNewPublicService(pubServ.id)" v-if="!isFinished">Bearbeiten</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isFinished">
            <div class="exp-cardcontent" v-for="element in combinedArray" :key="element.id" :class="{ 'green-background': element.type === 'publicService' }">
                <div class="exp-cardcontent-left">
                    {{ element.dateFrom }} bis {{ element.dateTo }}
                </div>
                <div class="exp-cardcontent-right" style="min-height: 5rem; display: flex; align-items: center; justify-content: center;">
                    <div>
                        <p>{{ element.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <button @click="backToAdjust()" class="button-remove" :class="{ 'visible': showButton }" v-if="isFinished">X</button>
    </div>
</div>
</template>

<style></style>