import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/classes',
      name: 'classes',
      component: require('@/pages/v-classes')
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/v-login')
    },
    {
      path: '/timer',
      name: 'timer',
      component: require('@/pages/v-timer')
    },
    {
      path: '/student/class_id/:class_id/class_subject_id/:class_subject_id',
      name: 'student',
      component: require('@/pages/v-student')
    },
    {
      path:'/group',
      name:'group',
      component: require('@/pages/v-group')
    },
    {
      path:'/page',
      name:'page',
      component: require('@/pages/v-page')
    },
    {
      path: '/',
      component: require('@/pages/v-classes')
    },
    {
      path:'/report',
      name:'report',
      component:require('@/pages/v-report')
    }
  ]
})
