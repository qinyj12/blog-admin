const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 自己写的
  TagsChoosen: state => state.tags.TagsChoosen, // 选择的tags
  ArticleRevising: state => state.article.ArticleRevising // 正在编辑器里被编辑的文章
}
export default getters
