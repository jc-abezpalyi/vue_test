// This is an examples of simple export.
//
// You can remove or add your own function in this file.

import { posts } from './data';

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template:
        `<div class="vue-app-wrapper"> 
            <form >
                <div>
                <input 
                 v-model="inputValue"
                 type="text">
                <select v-model="filteredValue" >
                  <option>userId</option>
                  <option>status</option>
                </select>
                <div v-if="filteredValue === 'userId'">
                    <span>author List:</span>
                   <ul>
                     <li v-for="author in authors" @click="test(author)" class="author__list-item">{{author}}</li>
                  </ul>
                </div>
                </div>
            </form>
            <div class="cards_wrapper">
            <div
             v-for="el in sortHiddenPosts"
             :key="el.id"
             class="card"
            >  
                <img :src="setImage(el)" alt="some image"> 
                <h2>{{el.title}}</h2> 
                <h2>{{el.userId}}</h2>  <!--   для наглядности работы фильтра -->
            </div>
            </div>
        </div>`,
      data() {
        return {
          posts:[],
          userPost: {},
          filteredValue: 'userId',
          inputValue: '',
          author: '',
          authors: posts.reduce((unique, item) => unique.includes(item.userId) ? unique : [...unique, item.userId], []),
        };
      },
      methods: {
        setImage(post) {
          return post.imgUrl || post.thumbnailUrl;
        },
        test(author) {
          this.inputValue = String(author);
          console.log(this.posts)
        },
      },
      computed: {
        sortHiddenPosts() {
          if (!this.inputValue) return posts.filter(el => el.status !== 'hidden');
          return posts.filter(el => String(el[this.filteredValue]) === this.inputValue);
        },
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
