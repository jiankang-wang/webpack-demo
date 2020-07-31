import testLoader from './utils/test'
require('./index.scss')
console.log('hello webpack')
testLoader()
 // 模式转换后的一些操作
 if (process.env.NODE_ENV === 'production') {
  console.log('prodiction enviroment')
 } else {
  console.log('development enviroment')
 }