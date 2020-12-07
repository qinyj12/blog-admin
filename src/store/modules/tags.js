// 这是关于文章标签tags的仓库
const state = {
    // 选中的tags
    TagsChoosen: ''
}

const mutations = {
    // 更改被选中的tags的方法
    CHOOSE_TAGS: (state, Tags) => {
        state.TagsChoosen = Tags
    }
}

const actions = {
    // 封装成action
    ChooseTags({ commit }, data) {
        commit('CHOOSE_TAGS', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }