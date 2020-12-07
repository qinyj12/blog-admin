const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 自己写的
  TagsChoosen: state => state.tags.TagsChoosen // 选择的tags
}
export default getters
