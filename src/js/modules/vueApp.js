// This is an examples of simple export.
//
// You can remove or add your own function in this file.
import { validationMixin } from 'vuelidate';
import { minLength } from 'vuelidate/lib/validators';
import { hasInputValidation } from './validators';

const vueApp = () => {
  if (!Vue) {
    return;
  }
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    data() {
      return {
        posts: [],
        userPost: {},
        author: '',
        titleSearch: '',
        authorFilterList: [],
        urlParams: [],
      };
    },
    mixins: [validationMixin],
    validations: {
      titleSearch: {
        minLength: minLength(1),
        hasInputValidation,
      },
    },
    methods: {
      getImage(post) {
        return post.imgUrl || post.thumbnailUrl || 'https://content.rozetka.com.ua/goods/images/big_tile/236753133.jpg' || '../images/default.jpg' ;
      },
      getPostsFromServer() {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((res) => res.json())
          .then((data) => {
            this.posts = [...data];
          })
          .catch((err) => {
            console.log(err);
          });
      },

      deleteFilterHandler(filterItem) {
        this.authorFilterList = this.authorFilterList.filter((el) => el !== filterItem);
      },
      getUrlParam() {
        const paramUserId = new URLSearchParams(window.location.search).get('userId');
        if (paramUserId) {
          this.authorFilterList = paramUserId.split(',').map((el) => Number(el));
        }
      },
      getUrlInputParam() {
        const paramUserId = new URLSearchParams(window.location.search).get('query');
        if (paramUserId) {
          this.titleSearch = paramUserId;
        }
      },
      urlFilterinputHandler() {
        const newurl = this.titleSearch.length ? `
          ${document.location.origin}?${this.authorFilterList.length ? 'userId=' : ''}${this.authorFilterList.join(',')}${this.titleSearch.length ? '&query=' : ''}${this.titleSearch}`
          : document.location.href = document.location.href.replace('query=', '');
        window.history.pushState({ path: newurl }, '', newurl);
      },
      urlFilterAuthorHandler() {
        const params = new URLSearchParams(document.location.search);
        const newurl = this.authorFilterList.length ? `
          ${document.location.origin}?${this.authorFilterList.length ? 'userId=' : ''}${this.authorFilterList.join(',')}${this.titleSearch.length ? '&query=' : ''}${this.titleSearch}`
          : document.location.href = document.location.href.replace('userId=', '');
        window.history.pushState({ path: newurl }, '', newurl);
      },
    },
    computed: {
      getAuthors() {
        return this.posts.reduce((unique, item) => (unique.includes(item.userId) ? unique
          : [...unique, item.userId]), []);
      },
      filteredPosts() {
        return this.posts.filter((el) => el.title.includes(this.titleSearch));
      },
    },
    created() {
      this.getPostsFromServer();
      this.getUrlParam();
      this.getUrlInputParam();
    },
  });
};

const init = () => {
  vueApp();
};

export default init;
