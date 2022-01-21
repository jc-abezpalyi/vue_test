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
                  <ul>
                      <li
                        v-for="author in getAuthors"
                        @click="authorHandler(author)"
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
          authorFilterList:[],
        };
      },
      methods: {
        setImage(post) {
          return post.imgUrl || post.thumbnailUrl || 'https://content.rozetka.com.ua/goods/images/big_tile/236753133.jpg';

        },
        authorHandler(author) {
          this.inputValue = String(author);
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
        deleteFilterHandler(filterItem){
          this.authorFilterList = this.authorFilterList.filter(el=> el!== filterItem)
        }
      },
      computed: {
        getAuthors() {
          return this.posts.reduce((unique, item) => unique.includes(item.userId) ? unique : [...unique, item.userId], []);
        },
      },
      created() {
        this.getPostsFromServer();

      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
