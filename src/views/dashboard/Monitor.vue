<template>
  <div class="search-content">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'SearchLayout',
    data () {
      return {
        tabs: {
          items: [
            {
              key: '1',
              title: '邮件配置tab'
            },
            {
              key: '2',
              title: '短信配置tab'
            },
            {
              key: '3',
              title: '文件储存配置tab'
            },
            {
              key: '4',
              title: '图片上传配置tab'
            },
          ],
          active: () => {
            switch (this.$route.path) {
              case '/dashboard/monitor/symail':
                return '1'
              case '/dashboard/monitor/symsg':
                return '2'
              case '/dashboard/monitor/syfile':
                return '3'
              case '/dashboard/monitor/sypic':
                return '4'
              default:
                return '1'
            }
          },
          callback: (key) => {
            switch (key) {
              case '1':
                this.$router.push('/dashboard/monitor/symail')
                break
              case '2':
                this.$router.push('/dashboard/monitor/symsg')
                break
              case '3':
                this.$router.push('/dashboard/monitor/syfile')
                break
              case '4':
                this.$router.push('/dashboard/monitor/sypic')
                break
              default:
                this.$router.push('/index')
            }
          }
        },
        search: false
      }
    },
    computed: {

    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
      margin-bottom: 16px;
    }
  }
  .search-content{
    // margin-top: 48px;
  }
</style>
