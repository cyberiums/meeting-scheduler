import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import meetingWindow from './modules/meetingWindow';
import timeSlots from './modules/timeSlots';
import api from './modules/api';

Vue.use(Vuex);

export default function initStore(messenger) {
  const store = new Vuex.Store({
    state: {
      launchOptions: {},
    },
    modules: {
      account,
      meetingWindow,
      timeSlots,
      api,
    },
    mutations: {
      setLaunchOptions(state, payload) {
        state.launchOptions = Object.assign({}, payload.launchOptions);
      },
    },
    actions: {
      initialize({ commit }, payload) {
        commit({
          type: 'setLaunchOptions',
          launchOptions: payload.launchOptions,
        });
        commit('meetingWindow/reset');
        commit('timeSlots/reset');
        commit('api/reset');
      },
      /**
       * This action acts as a helper to forward event message
       * from components to EventMessenger and does not modify any state
       */
      event(state, payload) {
        // this.messenger is set in MeetingSchedulerView constructor
        this.messenger.send(payload);
      },
    },
  });

  store.messenger = messenger;
  return store;
}