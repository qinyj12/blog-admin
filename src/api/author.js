export function ArticleAuthor() {
    return new Promise((resolve) => {
        resolve(
            [
                {
                    id: 0,
                    name: 'dog',
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/82',
                    phone: '17611595223',
                    jurisdiction: '管理员',
                    addTime: '2021-01-20',
                    recentlyActive: '2021-01-20',
                    articleNum: 'null'
                },
                {
                    id: 1,
                    name: 'cat',
                    avatar: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
                    phone: '13552501767',
                    jurisdiction: '作者',
                    addTime: '2021-01-20',
                    recentlyActive: '2021-01-20',
                    articleNum: 'null'
                },
                {
                    id: 2,
                    name: 'nobody',
                    avatar: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
                    phone: '110',
                    jurisdiction: '访客',
                    addTime: '2021-01-20',
                    recentlyActive: '2021-01-20', 
                    articleNum: 'null'
                },
            ]
        )
    })
}