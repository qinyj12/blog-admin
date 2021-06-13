import request from '@/utils/request'

export function getAllArticle(range_start, range_end) {
    return request({
        url: 'http://127.0.0.1:5000/article/collection/list/',
        method: 'get',
        params: { range_start, range_end }
    })
}

export function uploadIllustration(formdata) {
    return request({
        url: 'http://127.0.0.1:5000/illustration/upload/',
        method: 'put',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formdata
    })
}

export function uploadIllustrationUrl() {
    return 'http://127.0.0.1:5000/illustration/upload/'
}

export function uploadArticle(formdata) {
    return request({
        url: 'http://127.0.0.1:5000/article/saveall/',
        method: 'put',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formdata
    })
}

export function addCover(formdata) {
    return request({
        url: 'http://127.0.0.1:5000/cover/',
        method: 'put',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formdata
    })
}

export function editorCover(formdata) {
    return request({
        url: 'http://127.0.0.1:5000/cover/',
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formdata
    })
}

export function getTags(max_num) {
    return request({
        url: 'http://127.0.0.1:5000/article/tag/',
        methods: 'get',
        params: { max_num }
    })
}

export function GetArticles(articleId) {
    return request({
        url: 'http://127.0.0.1:5000/article/collection/info/',
        methods: 'get',
        params: {articleId}
    })
}

export function GetArticleById(article_id, if_need_content) {
    return request({
        url: 'http://127.0.0.1:5000/article/id/',
        methods: 'get',
        params: {article_id, if_need_content}
    })
}