// 正在通过“文章编辑”界面修改的文章。
const state = {
    // 每次加载文章编辑模块时，都会读取动态路由然后从api获取文章详情，所以不用store仓库传值
    // 但有一个例外情况，文章编辑模块读取到文章cover后，要传值给另一个模块imgcropper，这里要用store仓库传值
    ArticleRevising: {
        ArticleCover: '',
    },
}

const mutations = {
    // 把要修改的文章传进来
    REVISE_ARTICLE: (state, ArticleDetails) => {
        state.ArticleRevising = ArticleDetails
    }
}

const actions = {
    // 封装成action
    ReviseArticle({ commit }, data) {
        commit('REVISE_ARTICLE', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }