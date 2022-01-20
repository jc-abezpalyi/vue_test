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
            <div v-for="el in sortHiddenPosts" :key="el.id" class="card">  
                <img :src="setImage(el)" alt="some image"> 
                <h2>{{el.title}}</h2> 
                <h2>{{el.status}}</h2>  <!--   для наглядности работы фильтра -->
            </div> 
        </div>`,

      data() {
        return {

        };
      },
      methods: {
        isTest() {
        },
        setImage(post) {
          return post.imgUrl || post.thumbnailUrl;
        },
      },
      computed: {
        sortHiddenPosts: () => posts.filter(el => el.status !== 'hidden'),
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
