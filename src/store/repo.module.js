import axios from "axios";
import qs from "qs";
import { TAGGIT_BASE_API_URL } from "../common/config";

const state = {
  repos: [],
  reposToDisplay: [],
  pageNm: '1',
  pageSize: '50',
  total: ''
};

const getters = {
  repos(state) {
    return state.repos;
  },
  reposToDisplay(state) {
    return state.reposToDisplay;
  },
  total(state) {
    return state.total;
  },
  pageNm(state) {
    return state.pageNm;
  },
  pageSize(state) {
    return state.pageSize;
  }
};

const mutations = {
  getRepoData(state, data) {
    state.repos = data.data;
    state.reposToDisplay = data.data;
    state.total = data.total;
  },
  getActiveTagRepoData(state, data) {
    state.reposToDisplay = data
  },
  changePageNm(state, data) {
    state.pageNm = data;
  }
};

const actions = {
  fetchRepos({ commit }, params) {
    commit('fetchingData');
    axios.get(TAGGIT_BASE_API_URL + '/user/' + params.userId + '/repos' + '?pageNm=' + state.pageNm + '&pageSize=' + state.pageSize, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(({ data }) => {
          commit('getRepoData', data);
          commit('fetchFinished')
        })
        .catch(error => {
          commit('fetchFinished');
          throw new Error(error);
        });
  },
  fetchReposUsingTags({ commit }, params) {
    commit('fetchingData');
    axios.get(TAGGIT_BASE_API_URL + '/user/' + params.userId + '/repo/search', {
      params: {
        tag: params.tags
      },
      paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({ data }) => {
      commit('getActiveTagRepoData', data);
      commit('fetchFinished')
    })
        .catch(error => {
          commit('fetchFinished');
          throw new Error(error);
        });
  },
  changePageNm({commit}, data) {
    commit('changePageNm', data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
