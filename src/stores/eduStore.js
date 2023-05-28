import { reactive, toRefs } from "vue"

export default function useEduStore() {
    const state = reactive({
        educations: []
    })

    const stateTwo = reactive({
        publicServices: []
    })

    let idCounter = 0
    let idCounterTwo = 0

    function loadEducation() {
        const array = JSON.parse(localStorage.getItem('educations'))

        if (array != null) {
            state.educations = array
        }

        idCounter = JSON.parse(localStorage.getItem('idEdu'))
    }

    function addEducation(education) {
        ++idCounter
        const newEducation = {
            id: idCounter,
            description: education.description,
            dateFrom: education.dateFrom,
            dateTo: education.dateTo
        }

        state.educations.push(newEducation)
        localStorage.setItem('educations', JSON.stringify(state.educations))
        localStorage.setItem('idEdu', JSON.stringify(idCounter))
    }

    function deleteEducation(position) {
        localStorage.removeItem('educations')
        const index = state.educations.findIndex(obj => obj.id === position)
        state.educations.splice(index, 1)
        if (state.educations.length > 0) {
            localStorage.setItem('educations', JSON.stringify(state.educations))
        }
    }

    function adjustEducation(position) {
        const index = state.educations.findIndex(obj => obj.id === position)
        const data = state.educations.filter(obj => obj.id === position)

        const updateArray = [
            {
                index: index,
                id: data[0].id,
                description: data[0].description,
                dateFrom: data[0].dateFrom,
                dateTo: data[0].dateTo
            }
        ]

        localStorage.setItem('adjustEducationData', JSON.stringify(updateArray))
    }

    function loadPublicService() {
        const array = JSON.parse(localStorage.getItem('publicServices'))

        if (array != null) {
            stateTwo.publicServices = array
        }

        idCounterTwo = JSON.parse(localStorage.getItem('idPS'))
    }

    function addPublicService(service) {
        ++idCounterTwo
        const newService = {
            id: idCounterTwo,
            description: service.description,
            dateFrom: service.dateFrom,
            dateTo: service.dateTo
        }

        stateTwo.publicServices.push(newService)
        localStorage.setItem('publicServices', JSON.stringify(stateTwo.publicServices))
        localStorage.setItem('idPS', JSON.stringify(idCounterTwo))
    }

    function deletePublicService(position) {
        localStorage.removeItem('publicServices')
        const index = stateTwo.publicServices.findIndex(obj => obj.id === position)
        stateTwo.publicServices.splice(index, 1)
        if (stateTwo.publicServices.length > 0) {
            localStorage.setItem('publicServices', JSON.stringify(state.educations))
        }
    }

    function adjustPublicService(position) {
        const index = stateTwo.publicServices.findIndex(obj => obj.id === position)
        const data = stateTwo.publicServices.filter(obj => obj.id === position)

        const updateArray = [
            {
                index: index,
                id: data[0].id,
                description: data[0].description,
                dateFrom: data[0].dateFrom,
                dateTo: data[0].dateTo
            }
        ]

        localStorage.setItem('adjustPublicServiceData', JSON.stringify(updateArray))
    }

    return {
        ...toRefs(state),
        loadEducation,
        addEducation,
        deleteEducation,
        adjustEducation,
        ...toRefs(stateTwo),
        loadPublicService,
        addPublicService,
        deletePublicService,
        adjustPublicService
    }
}