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
  import axios from "axios";
  import {TAGGIT_BASE_API_URL, TAGGIT_BASE_WS_URI} from "../common/config";

  export default {
    name: "RepoSync",
    data() {
      return {
        isSyncing: false,
        syncProgressPercent: 0,
        syncStatus: ''
      }
    },
    methods: {
      resyncRepos() {
        this.isSyncing = true;
        this.syncStatus = 'Initiated';
        let syncJobId = '';
        axios.post(TAGGIT_BASE_API_URL + "/user/" + this.$route.params.userId + "/sync").then(response => {
          syncJobId = response.data;
          this.$connect(TAGGIT_BASE_WS_URI + '/' + syncJobId, {format: 'json'});
          this.$options.sockets.onmessage = (data) => {
            let wsResponse = JSON.parse(data.data);
            this.syncProgressPercent = wsResponse.progressPercent * 100;
            this.syncStatus = wsResponse.status;
            if (this.syncStatus === 'Update completed!') {
              this.$buefy.toast.open('Repo sync complete 🚀');
              this.isSyncing = false;
            }
          };
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
