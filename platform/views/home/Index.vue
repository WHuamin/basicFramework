<template>
  <div>首页</div>
</template>
<script>
import testApis, { singleRequest } from '@platform/api/test/index.js'

export default {
  name: 'platformHome',
  mounted () {
    singleRequest('getMenuBar', { test: '123' }).then((result) => {
      console.log('--321', result)
    }).catch((err) => {
      console.log(err)
    })

    testApis.getMenuBar({ test: '321' }).then((result) => {
      console.log('321', result)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
