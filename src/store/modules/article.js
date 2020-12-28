// 正在通过“文章编辑”界面修改的文章。
const state = {
    // 如果选择新建文章，那这个值就是空的。如果是修改文章，那就把现有文章传进来
    // 这个值包含文章标题、正文、封面、标签、作者
    ArticleRevising: {
        content: '',
        title: ''
    }
}

const mutations = {
    // 把要修改的文章传进来
    Revise_ARTICLE: (state, ArticleDetails) => {
        state.ArticleRevising = ArticleDetails
    }
}

const actions = {
    // 封装成action
    ReviseArticle({ commit }, data) {
        commit('Revise_ARTICLE', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }