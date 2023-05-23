<script>
import { reactive, ref } from 'vue'

export default {
    setup() {
        const form = reactive({
            name: '',
            prename: '',
            profession: '',
            phone: '',
            email: '',
            street: '',
            location: '',
            postal: ''         
        })

        let formIsEmpty = ref()
        let showButton = ref(false)

        const savePersonInfo = () => {
            localStorage.setItem("person", JSON.stringify(form))
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key)) {
                    form[key] = ''
                }
            }
            getPersonInfo()
            formIsEmpty.value = false
        }

        const getPersonInfo = () => {
            let storedPerson = localStorage.getItem("person")
            let parsedPerson = JSON.parse(storedPerson)
            for (const key in parsedPerson) {
                if (Object.prototype.hasOwnProperty.call(parsedPerson, key)) {
                    form[key] = parsedPerson[key]
                }
            }

            if (parsedPerson == null) {
            formIsEmpty.value = true
            }
        }

        const deletePersonInfo = () => {
            localStorage.removeItem('person')
            for (const key in form) {
                if (Object.prototype.hasOwnProperty.call(form, key)) {
                    form[key] = ''
                }
            }
            getPersonInfo()
        }

        const showButtonHandler = () => {
            showButton.value = true
        }

        const hideButtonHandler = () => {
            showButton.value = false
        }

        getPersonInfo()
        
        return {
            form,
            formIsEmpty,
            showButton,
            savePersonInfo,
            getPersonInfo,
            deletePersonInfo,
            showButtonHandler,
            hideButtonHandler
        }
    }
}

</script>

<template>
    <div class="container-subsite">
        <div class="create-card">
            <form @submit.prevent="savePersonInfo" v-if="formIsEmpty">
                <h3>Personalien</h3>
                <div class="form-row">
                    <div>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required v-model="form.name">
                    </div>
                    <div>
                        <label for="vorname">Vorname:</label>
                        <input type="text" id="vorname" name="vorname" required v-model="form.prename">
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label for="beruf">Beruf:</label>
                        <input type="text" id="beruf" name="beruf" required v-model="form.profession">
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label for="tel">Tel:</label>
                        <input type="tel" id="tel" name="tel" required v-model="form.phone">
                    </div>
                    <div>
                        <label for="email">E-Mail:</label>
                        <input type="email" id="email" name="email" required v-model="form.email">
                    </div>
                </div>

                <div class="form-row">
                    <div>
                        <label for="strasse">Straße:</label>
                        <input type="text" id="strasse" name="strasse" required v-model="form.street">
                    </div>
                    <div>
                        <label for="ort">Ort:</label>
                        <input type="text" id="ort" name="ort" required v-model="form.location">
                    </div>
                    <div>
                        <label for="plz">PLZ:</label>
                        <input type="text" id="plz" name="plz" required v-model="form.postal">
                    </div>
                </div>

                <button class="button-submit" type="submit">Speichern</button>
            </form>
        </div>

        <div class="card" v-if="!formIsEmpty" @mouseover="showButtonHandler" @mouseout="hideButtonHandler">
            <h1 class="title">{{form.prename + ' ' + form.name}}</h1>
            <h3 class="subtitle">{{ form.profession }}</h3>
            <p class="text"><b>Tel:</b> <span>{{ form.phone }}</span></p>
            <p class="text"><b>Email:</b> <span>{{ form.email }}</span></p>
            <p class="text"><b>Adresse:</b> <span>{{form.street + ', ' + form.postal + ' ' + form.location}}</span></p>
            <button @click="deletePersonInfo" class="button-remove" :class="{ 'visible': showButton }">X</button>
        </div>
    </div>
</template>

<style></style>