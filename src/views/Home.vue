<template>
    <div class="container">
        <div class="section">
            <div class="columns">
                <div class="column">
                    <h1 class="title">{{ userName }}'s stars 🤩</h1>
                </div>
                <div ref="repoSync" class="column">
                    <RepoSync/>
                </div>
            </div>
        </div>
        <b-loading v-if="isLoading" :active="isLoading" :can-cancel="false"/>
        <div class="section">
            <TagsList/>
        </div>
        <div class="section">
            <Repos/>
        </div>
        <hr>
        <div class="section">
            <div>
                <b-pagination
                        :total="total"
                        :current.sync="pageNm"
                        :per-page="pageSize"
                        order="is-centered"
                        range-before="3"
                        range-after="1"
                        aria-next-label="Next page"
                        aria-previous-label="Previous page"
                        aria-page-label="Page"
                        aria-current-label="Current page"
                        v-on:change="pageClickCallBack">
                </b-pagination>
            </div>
        </div>
        <hr>
        <section>
            <div>
                <footer class="footer">
                    <div class="content has-text-centered">
                        <p>
                            <strong>TAGGIT</strong> by <a href="https://shiveenp.com">Shiveen Pandita</a>. The source
                            code is
                            licensed
                            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                        </p>
                    </div>
                </footer>
            </div>
        </section>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import axios from "axios";
  import Repos from "../components/Repos";
  import TagsList from "../components/TagsList";
  import RepoSync from "../components/RepoSync";
  import {TAGGIT_BASE_API_URL} from "../common/config";

  export default {
    name: "User",
    components: {TagsList, Repos, RepoSync},
    computed: {
      ...mapGetters(["userName", "email", "githubUserName", "githubUserId", "isLoading", "reposToDisplay", "pageNm", "pageSize", "total"])
    },
    methods: {
      fetchUserDetails() {
        this.$store.dispatch('fetchUser', {userId: this.$route.params.userId});
        // check if user has repos
        axios.get(TAGGIT_BASE_API_URL + '/user/' + this.$route.params.userId + '/repos').then(response => {
          if (response.data.data.length === 0) {
            this.$store.dispatch('resyncRepos', {vmInstance: this, userId: this.$route.params.userId});
            this.$store.dispatch('fetchRepos', {userId: this.$route.params.userId});
          }
        });
      },
      pageClickCallBack(pageNm) {
        this.$store.dispatch("changePageNm", pageNm)
        this.$store.dispatch('fetchRepos', {userId: this.$route.params.userId});
      }
    },
    created() {
      this.fetchUserDetails();
    }
  }
</script>

<style scoped>
    .no-repos {
        text-align: center;
    }
</style>
