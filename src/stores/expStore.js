import { reactive, toRefs } from "vue"

export default function useExpStore() {
    const state = reactive({
        experiences: []
    })

    let idCounter = 0

    function loadExp() {
        const array = JSON.parse(localStorage.getItem('experiences'))

        if (array != null) {
            state.experiences = array
        }

        idCounter = JSON.parse(localStorage.getItem('idExp'))
    }

    function addExp(exp) {
        ++idCounter
        const newExp = {
            id: idCounter,
            employer: exp.employer,
            jobTitle: exp.jobTitle,
            dateFrom: exp.dateFrom,
            dateTo: exp.dateTo,
            tasks: exp.tasks
        }

        state.experiences.push(newExp)
        localStorage.setItem('experiences', JSON.stringify(state.experiences))
        localStorage.setItem('idExp', JSON.stringify(idCounter))
    }

    function deleteExp(position) {
        localStorage.removeItem('experiences')
        const index = state.experiences.findIndex(obj => obj.id === position)
        state.experiences.splice(index, 1)
        if (state.experiences.length > 0) {
            localStorage.setItem('experiences', JSON.stringify(state.experiences))
        }
    }

    function adjustExp(position) {
        const index = state.experiences.findIndex(obj => obj.id === position)
        const data = state.experiences.filter(obj => obj.id === position)

        const updateArray = [
            {
                index: index,
                id: data[0].id,
                employer: data[0].employer,
                jobTitle: data[0].jobTitle,
                dateFrom: data[0].dateFrom,
                dateTo: data[0].dateTo,
                tasks: data[0].tasks
            }
        ]

        localStorage.setItem('adjustExperienceData', JSON.stringify(updateArray))
    }

    return {
        ...toRefs(state),
        loadExp,
        addExp,
        deleteExp,
        adjustExp
    }
}