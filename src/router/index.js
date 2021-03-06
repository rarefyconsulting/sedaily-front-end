import Router from 'vue-router'

import { Home }  from '@/views/home'
import PostsFeed  from '@/views/postsFeed/PostsFeed'
import PostView from '@/views/post/PostView'
import PopularView from '@/views/PopularView'
import SearchView  from '@/views/search/SearchView'
import { LoginView, SubscribeView, RegisterView, RegainAccount, SettingsView, ForgotPassword, CallbackTwitter } from '@/views/account'
import RecomendationListView from '@/views/RecomendationListView'
import FeedView from '@/views/FeedView'
import { ProfileView, PublicProfileView, EditProfile }  from '@/views/profile'
import PremiumChoices from '@/views/PremiumChoices'
import { AdminDashboard, AdminCompany, AdminTopic, AdminUserList, AdminUser } from '@/views/admin'
import { TopicPage, TopicForm, TopicPageEdit, TopicPageCreate } from '@/views/topic'
import { CompanyCompose, CompanyLandingPage, UpdateCompanyProfile, CompanyEdit } from '@/views/company'
import { JobView, AddJobView, EditJobView, JobsBoardView } from '@/views/job'
import Contributors from '@/views/Contributors'
import { ForumView, ForumThreadView, NewForumThreadView, NewProjectForumThreadView, EditForumThreadView }  from '@/views/forum'
import WriteInfoView from '@/views/write/WriteInfoView'
import BookmarksView from '@/views/bookmarks/BookmarksView'
import QuestionView from '@/views/question/QuestionView'

import { apiConfig } from '../../config/apiConfig'
import authorize from './authHook'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home,
      children: [
        { path: '', name: 'PostsAll', component: PostsFeed },
        { path: '/posts/:slug', name: 'Posts', component: PostsFeed },
        { path: '/search', name: 'Search', component: SearchView },
        { path: '/popular', name: 'Popular', component: PopularView }, // TODO removed from home for now
      ]
    },
    { path: '/write', component: WriteInfoView },
    // { path: '/topics/:topic', component: SearchView },
    // { path: '/topics/:topic/:search', component: SearchView },
    { path: '/regain-account/:secretKey/:resetUID', component: RegainAccount },
    // { path: '/top/:page(\\d+)?', component: TopListView },
    // { path: '/new/:page(\\d+)?', component: SearchView },
    { path: '/recommendations/:page(\\d+)?', component: RecomendationListView },
    { path: '/feed', component: FeedView },
    { path: '/post/:id([A-Za-z0-9-_]+)?/:postTitle([A-Za-z0-9-_]+)?', name: 'Post', component: PostView },
    { path: '/subscribe', component: SubscribeView, props: { stripePublicKey: apiConfig.STRIPE_PUBLIC_KEY }},
    { path: '/premium', component: PremiumChoices },
    { path: '/login', component: LoginView },
    { path: '/edit-profile', beforeEnter: authorize, component: EditProfile },
    { path: '/register', component: RegisterView },
    { path: '/callback/twitter', component: CallbackTwitter },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/settings', name: 'NotificationSettings', beforeEnter: authorize, component: SettingsView },
    { path: '/profile', name: 'Profile', component: ProfileView },
    { path: '/profile/:id([A-Za-z0-9-_]+)?', name: 'PublicProfile', component: PublicProfileView },
    { path: '/bookmarks', component: BookmarksView },
    { path: '/jobs', component: JobsBoardView },
    { path: '/jobs/:id([A-Za-z0-9-_]+)?', component: JobView },
    { path: '/add-job', beforeEnter: authorize, component: AddJobView },
    { path: '/edit-job/:id([A-Za-z0-9-_]+)?', beforeEnter: authorize, component: EditJobView },
    { path: '/update-company/:id([A-Za-z0-9-_]+)?/:companyName([A-Za-z0-9-_]+)?', beforeEnter: authorize, component: UpdateCompanyProfile },
    { path: '/contributors', component: Contributors },
    // { path: '/forum', component: ForumView },
    { path: '/new-thread', beforeEnter: authorize, name: 'NewThread', component: NewForumThreadView,  props: true },
    { path: '/new-project-thread', beforeEnter: authorize, name: 'NewProjectThread', component: NewProjectForumThreadView },
    // { path: '/forum/edit-thread/:id([A-Za-z0-9-_]+)?', beforeEnter: authorize, component: EditForumThreadView },
    // { path: '/forum/:id([A-Za-z0-9-_]+)?/', component: ForumThreadView },
    { path: '/admin', beforeEnter: authorize, component: AdminDashboard,
      children: [
        { path: 'company', component: AdminCompany },
        { path: 'company/add', component: CompanyCompose },
        { path: 'company/:id', component: CompanyEdit },
        { path: 'topic', component: AdminTopic },
        { path: 'topic/add', component: TopicForm },
        { path: 'topic/:id', component: TopicForm },
        { path: 'user', component: AdminUserList },
        { path: 'user/:id', component: AdminUser },
      ]
    },
    { path: '/topic/create', name: 'TopicPageCreate', component: TopicPageCreate },
    { path: '/topic/:slug', name: 'TopicPage', component: TopicPage },
    { path: '/topic/:slug/question/:questionId', name: 'Question', component: QuestionView },
    { path: '/topic/:slug/edit', name: 'TopicPageEdit', component: TopicPageEdit },
    { path: '/:company', component: CompanyLandingPage }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // Redirect all /# (hash) routes to non hash:
  try {
    if (to.fullPath && to.fullPath[1] === '#') {
      const withoutHash = to.fullPath.split('#')[1]
      router.push(withoutHash)
    } else {
      // Default, this will just go to the actual route
      next()
    }
  } catch (_) {
    // Catch all: go to default route
    next()
  }
})
export default router
