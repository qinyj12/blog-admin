// import request from '@/utils/request'

export function GetArticles(params) {
    return new Promise((resolve) => {
        resolve(
            [
                {
                    id: 0,
                    title: '第一篇文章',
                    author: 0, 
                    time: '2020-12-08',
                    cover: require('@/assets/develop_images/cover1.jpg'),
                    tag: 'first'
                },
                {
                    id: 1,
                    title: '第二篇文章',
                    author: 1, 
                    time: '2020-12-09',
                    cover: require('@/assets/develop_images/cover2.jpg'),
                    tag: 'second'
                }
            ]
        )
    })
}

export function GetContent(articleId) {
    return new Promise((resolve) => {
        resolve(
            '第'+articleId+'篇文章的正文'
        )
    })
}


  