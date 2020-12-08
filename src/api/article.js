// import request from '@/utils/request'

export function GetArticles(params) {
    return new Promise((resolve) => {
        resolve(
            [
                {
                    id: 0,
                    title: '第一篇文章',
                    author: 'dog', 
                    time: '2020-12-08',
                    cover: 'cover1.jpg'
                },
                {
                    id: 1,
                    title: '第二篇文章',
                    author: 'cat', 
                    time: '2020-12-09',
                    cover: 'cover2.jpg'
                }
            ]
        )
    })
  }
  