<template>
    <div class="columns">
        <div class="column is-one-fifth">
            <button size="is-small" class="button is-primary" icon-left="reload" @click="resyncRepos">Sync
            </button>
        </div>
        <div v-if="isSyncing" class="column">
            <b-progress type="is-info" :value="syncProgressPercent" size="is-medium" show-value>
                {{ syncStatus }}
            </b-progress>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    name: "RepoSync",
    computed: {
      ...mapGetters(["isSyncing", "syncProgressPercent", "syncStatus"])
    },
    methods: {
      resyncRepos() {
        this.$store.dispatch('resyncRepos', {vmInstance: this, userId: this.$route.params.userId});
      }
    }
  }
</script>

<style scoped>

</style>
