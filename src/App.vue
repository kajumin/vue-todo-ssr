<template>
  <div id="app" class="app">
    <div class="cover"></div>
    <Header></Header>
    <to-do></to-do>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import ToDo from './views/todo/todo.vue'
export default {
  data() {
    return {
      text: 'abc'
    }
  },
  created() {
    console.log(process.env.NODE_ENV)
    setTimeout(() => {
      console.log('settimeout')
    }, 1000)
  },
  components: {
    Header,
    Footer,
    ToDo
  }
}
</script>

<style scoped lang="stylus">
.app{
  position relative
  height 100%
  .cover {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background-color #999
    opacity 0.9
    z-index -1
  }
}
.fade-enter-active, .fade-leave-active {
  transition opacity 1.5s
}
.fade-enter, .fade-leave-to {
  opacity 0
}
</style>