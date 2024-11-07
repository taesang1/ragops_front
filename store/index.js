export const state = () => ({
  project_id : 1,
  project_name : '',
  project_list : []
})

export const mutations = {
  check_project_id(state, data) {
    state.project_id = data['id']
    state.project_name = data['name']
  },
  set_project_list(state, data) {
    state.project_list = []
    for (let i of data['projects']) {
      state.project_list.push({'id':i['id'], 'name':i['name']})
    }
  }
}

export const actions = {
  get_project_list( {state, commit}) {
    return this.$axios.get(`/api/v1/projects`)
    .then((res) => {
      commit('set_project_list', res.data)
      return res.data
    })
    .catch((res) => {
    })
  },
  new_project( {state, commit}, name) {
    return this.$axios.post(`/api/v1/projects?name=${name}`,)
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
    return this.$axios.post(`/api/v1/projects/${state.project_id}/files/upload`, body)
    .then((res) => {
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  copy_project_file( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${state.project_id}/files/copy`, body)
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
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files/${body['file_no']}/download`, {responseType: "blob",})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_file_html( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/files/${body['file_no']}/download/html`, {responseType: "blob",})
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
    return this.$axios.post(`/api/v1/projects/${body['project_id']}/sims`, null, {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_simulate_result( {state, commit}, body) {
    return this.$axios.get(`/api/v1/projects/${body['project_id']}/sims`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_db( {state, commit}) {
    return this.$axios.get(`/api/v1/projects/${state.project_id}/dbs`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  create_db( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${body['project_id']}/dbs`, null, {params : body})
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_query( {state, commit}) {
    return this.$axios.get(`/api/v1/projects/${state.project_id}/queries`)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  create_query( {state, commit}, body) {
    return this.$axios.post(`/api/v1/projects/${state.project_id}/queries`, body)
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
}
