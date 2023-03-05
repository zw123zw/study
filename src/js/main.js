require('@/css/index')
console.log('main:12111123123')

const utilsMethond = require('./utils')
console.log(utilsMethond.getName())
class Eve {
  constructor(name, id) {
    this.name = name
    this.id = id
  }
}

const neevet = new Eve('11111', '22222')
console.log(neevet)

import lodash from 'lodash'
console.log(lodash.flatten(1, [2, 3]))

// webpack.DefinePlugin全局变量
console.log(AUTHOR);
console.log(AGE);
console.log(SEX);