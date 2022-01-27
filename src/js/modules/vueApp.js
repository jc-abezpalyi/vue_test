// This is an examples of simple export.
//
// You can remove or add your own function in this file.
import { validationMixin } from 'vuelidate';
import { minLength } from 'vuelidate/lib/validators';
import { hasSimbol, hasNumber } from './validators';

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
        isValidSearch: true,
        authorFilterList: [],
        urlParams: [],
      };
    },
    mixins: [validationMixin],
    validations: {
      titleSearch: {
        minLength: minLength(1),
        hasSimbol,
        hasNumber,

      },
    },
    methods: {
      getImage(post) {
        return post.imgUrl || post.thumbnailUrl || 'https://content.rozetka.com.ua/goods/images/big_tile/236753133.jpg';
      },
      disabled() {
        return this.isValidSearch ? 'disabled' : '';
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
    watch: {
      authorFilterList(value) {
        const newurl = value.length ? `${document.location.origin}?userId=${this.authorFilterList.join(',')}` : document.location.origin;
        window.history.pushState({ path: newurl }, '', newurl);
      },
      titleSearch(value) {
        const newurl = this.titleSearch.length ? `${document.location.origin}?userId=${this.authorFilterList.join(',')}&query=${this.titleSearch}` : document.location.origin;
        window.history.pushState({ path: newurl }, '', newurl);
      },
    },
  });
};

const init = () => {
  vueApp();
};

export default init;
