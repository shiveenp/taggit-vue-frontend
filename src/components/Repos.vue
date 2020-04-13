<template>
    <div class="columns is-multiline is-mobile">
        <div class="column is-one-third" v-for="repo in reposToDisplay" :key="repo.id">
            <GithubRepo
                    :id="repo.id"
                    :repo-name="repo.repoName"
                    :github-link="repo.githubLink"
                    :github-description="repo.githubDescription"
                    :owner-avatar-url="repo.ownerAvatarUrl"
                    :metadata="repo.metadata"
            />
        </div>
    </div>
</template>

<script>
  import GithubRepo from "./GitHubRepo";
  import {mapGetters} from "vuex";

  export default {
    name: "Repos",
    components: {GithubRepo},
    computed: {
      ...mapGetters(["repos", "reposToDisplay", "activeTags"])
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      activeTags(newValue, oldValue) {
        if (newValue.length > 0) {
          this.$store.dispatch('fetchReposUsingTags', {userId: this.$route.params.userId, tags: newValue});
        } else {
          this.$store.dispatch('fetchRepos', {userId: this.$route.params.userId});
        }
      }
    },
    methods: {
      fetchUserRepos() {
        this.$store.dispatch('fetchRepos', {userId: this.$route.params.userId});
      }
    },
    created() {
      this.fetchUserRepos();
    }
  }
</script>

<style scoped>
    .columns {
        display: flex;
        flex-direction: row;
    align-items: stretch;
    }
</style>
