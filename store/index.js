export const state = () => ({
  project_id : 1
})

export const mutations = {
  check_project_id(state, data) {
    state.project_id = data
  }
}

export const actions = {
  get_project_list( {state, commit}) {
    return this.$axios.get(`/api/v1/projects`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  new_project( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects`, body)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_server_file_base_list( {state, commit}, body) {
    return this.$axios.get(`/api/v1/server-files/base-dir`, {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_server_file_list( {state, commit}, body) {
    return this.$axios.get(`/api/v1/server-files`, {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  upload_project_file( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${project_id}/files/upload`, body)
    .then((res) => {
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  copy_project_file( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${project_id}/files/copy`, body)
    .then((res) => {
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_project_file_list( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_file( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files/${body['file_no']}/download`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_file_text( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${project_id}/files/${file_no}/text`,  {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_file_parsing( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files/${body['file_no']}/docs`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_file_chunk( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files/${body['file_no']}/chunks`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  simulate_expected_time( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/simulate/expected-time`,  {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  simulate_run( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${body['project_id']}/sims`, body)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_simulate_result( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${project_id}/sims`, body)
    .then((res) => {
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
}
