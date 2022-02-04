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
        searchParams: null,
        defaultSearchParam: ['userId', 'query'],
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
    created() {
      this.getPostsFromServer();
      this.getParams();
      this.bindUrlParams();
    },
    methods: {
      bindUrlParams() {
        if (this.searchParams.get('userId')) {
          this.authorFilterList = [...this.searchParams.get('userId').split(',')].map((el) => Number(el));
        }
        if (this.searchParams.get('query')) {
          this.titleSearch = this.searchParams.get('query');
        }
      },
      getParams() {
        this.searchParams = new URLSearchParams(window.location.search);
      },
      getImage(post) {
        return post.imgUrl || post.thumbnailUrl  || '../images/default.jpg';
      },
      getPostsFromServer() {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((res) => res.json())
          .then((data) => {
            this.posts = [...data];
          })
          .catch((err) => {
            throw err;
          });
      },
      deleteFilterHandler(filterItem) {
        this.authorFilterList = this.authorFilterList.filter((el) => el !== filterItem);
      },
      urlParamsHandler() {
        this.defaultSearchParam.forEach((param) => {
          this.searchParams.delete(param);
          if (this.titleSearch) {
            this.searchParams.delete('query');
            this.searchParams.append('query', this.titleSearch);
          }
          if (this.authorFilterList.length) {
            this.searchParams.delete('userId');
            this.searchParams.append('userId', this.authorFilterList.join(','));
          }
        });
        window.history.pushState({ path: `?${this.searchParams.toString()}` }, '', `?${this.searchParams.toString()}`);
      },
      checkBoxUrlParam(){

        this.defaultSearchParam.forEach((param) => {
          this.searchParams.delete(param);
          if (this.authorFilterList.length) {
            this.searchParams.delete('userId');
            this.searchParams.append('userId', this.authorFilterList.join(','));
          }
        });
        window.history.pushState({ path: `?${this.searchParams.toString()}` }, '', `?${this.searchParams.toString()}`);
      }
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
  });
};

const init = () => {
  vueApp();
};

export default init;
