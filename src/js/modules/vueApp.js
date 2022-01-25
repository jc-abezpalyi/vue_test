// This is an examples of simple export.
//
// You can remove or add your own function in this file.

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template:
        `<div class="vue-app-wrapper"> 
                <div class="title">
                   <h1>Posts List</h1>
                </div>
               <div v-if="authorFilterList.length" class="catalog__settings-top-menu">
               Filters:
                  <div 
                  @click="deleteFilterHandler(filterItem)"
                  class="catalog__settings-filter-item"
                  v-for="filterItem in authorFilterList"
                  >
                      {{filterItem}}
                  </div>
               </div>
             <div class="catalog">
              <div class="catalog__settings">
                <div >
                <span class="catalog__settings-title">Authors:{{getAuthors.length}}</span>
                <div>
                <div class="search"> <input @keypress="filteredPosts" type="text" placeholder="search title" v-model="titleSearch"></div>
                  <ul>
                      <li
                        v-for="author in getAuthors"
                        class="author__list-item">
                        <label>
                          {{author}}
                       <input
                        :value="author"
                        v-model="authorFilterList"
                        type="checkbox"
                       >
                         </label>
                       </li>
                  </ul>
                 </div>
                </div>
            </div>
            <div class="cards_wrapper">
             <template v-for="post in posts">
                <div
                  v-if="!authorFilterList.length || authorFilterList.includes(post.userId)"
                  :key="post.id"
                  class="card"
                >
                    <div class="card__img-wrapper">
                        <img
                         :src="setImage(post)"
                          alt="some image"
                          >                 
                    </div>
                    <div class="card__info-wrapper">
                        <span class="card__title">{{post.title}}</span>
                        <p class="card__title-description">{{post.body}}</p>
                        <p class="card__title-description">{{post.userId}}</p>
                    </div>
                </div>
             </template>
            </div>
          </div>
        </div>`,
      data() {
        return {
          posts: [],
          userPost: {},
          author: '',
          titleSearch:'',
          authorFilterList:[],
          urlParams:[],
        };
      },
      methods: {
        setImage(post) {
          return post.imgUrl || post.thumbnailUrl || 'https://content.rozetka.com.ua/goods/images/big_tile/236753133.jpg';
        },
        getPostsFromServer() {
          fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
              this.posts.push(...data);
            })
            .catch(err => {
              console.log(err);
            });
        },
        filteredPosts(){
         this.posts = this.posts.filter((el) => {
            return el.title.indexOf(this.titleSearch) !== -1
          })
        },
        deleteFilterHandler(filterItem){
          this.authorFilterList = this.authorFilterList.filter(el=> el!== filterItem)
        },
        getUrlParam(){
          const paramUserId = new URLSearchParams(window.location.search).get('userId')
          if(paramUserId) {
            this.authorFilterList = paramUserId.split(',').map(el => Number(el));
          }
        },
        getUrlInputParam(){
          const paramUserId = new URLSearchParams(window.location.search).get('query')
          if(paramUserId) {
            this.titleSearch = paramUserId;
          }
        }
      },
      computed: {
        getAuthors() {
          return this.posts.reduce((unique, item) => unique.includes(item.userId) ? unique : [...unique, item.userId], []);
        },
      },
      created() {
        this.getPostsFromServer();
        this.getUrlParam();
        this.getUrlInputParam();
      },
      watch:{
        authorFilterList(value){
          const newurl = value.length ? `${document.location.origin}?userId=${this.authorFilterList.join(',')}&query=${this.titleSearch}`: document.location.origin
          window.history.pushState({path:newurl},'', newurl)
        },
        titleSearch(value){
          const newurl = value.length ? `${document.location.origin}?userId=${this.authorFilterList.join(',')}&query=${this.titleSearch}`: document.location.origin
          window.history.pushState({path:newurl},'', newurl)
        },
      },

    });
  }
};

const init = () => {
  vueApp();
};

export default init;
