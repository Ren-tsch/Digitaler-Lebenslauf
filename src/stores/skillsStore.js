import { reactive, toRefs } from "vue"

export default function useSkillsStore() {
  const state = reactive({
    skills: []
  })

  let idCounter = 0

  function loadSkills() {
    const array = JSON.parse(localStorage.getItem('skills'))

    if (array != null) {
      state.skills = array
    }

    idCounter = JSON.parse(localStorage.getItem('id'))
  }

  function addSkill(skill) {
    ++idCounter
    const newSkill = {
      id: idCounter,
      title: skill.title,
      content: skill.content
    }

    state.skills.push(newSkill)
    localStorage.setItem('skills', JSON.stringify(state.skills))
    localStorage.setItem('id', JSON.stringify(idCounter))
  }

  function deleteSkill(position) {
    localStorage.removeItem('skills')
    const index = state.skills.findIndex(obj => obj.id === position)
    state.skills.splice(index, 1)
    if (state.skills.length > 0) {
      localStorage.setItem('skills', JSON.stringify(state.skills))
    }
  }

  function adjustSkill(position) {
    const index = state.skills.findIndex(obj => obj.id === position)
    const data = state.skills.filter(obj => obj.id === position)

    const updateArray = [
      {
        index: index,
        id: data[0].id,
        title: data[0].title,
        content: data[0].content
      }
    ]

    localStorage.setItem('adjustSkillData', JSON.stringify(updateArray))
  }

  return {
    ...toRefs(state),
    loadSkills,
    addSkill,
    deleteSkill,
    adjustSkill
  }
}
