// import request from '@/utils/request'

export function GetTag(params) {
  return new Promise((resolve) => {
      resolve(
          [
              { name: '案例', num: 2 },
              { name: '生活', num: 3 }
          ]
      )
  })
}
