import { createStore } from 'vuex'
export default createStore({
  strict: process.env.NODE_ENV !=='production', // !

  state: {
    API: 'http://localhost:3000/api/',
    postsKey: +0,
    unseenPosts: []
  },
  getters: {
    unseenPostsCounter(state) {
      return state.unseenPosts.length
    }
  },
  mutations: {
    UPDATE_POSTKEY(state) {
      state.postsKey += 1;
    },
    SET_UNSEEN_POSTS(state, unseenList) {
      state.unseenPosts = unseenList;
    },
    REMOVE_SEEN_POST(state, postId) {
      const index = state.unseenPosts.indexOf(postId)
      state.unseenPosts.splice(index, 1);
    }
  },
  actions: {
   setProfileAvatar(ctx, profileId) {
     const url = 'http://localhost:3000/api/profile/' + profileId;
      const headers = { 'authorization': 'Bearer' + ' ' +  window.sessionStorage.getItem('auth') }
      fetch(url, { headers })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw res.status;
        }
      })
      .then((profile) => {
        if(profile.avatarUrl) {
          window.sessionStorage.setItem('avatarUrl', profile.avatarUrl);
        }
      })
      .catch(err => {
        alert('Sorry, request failed!');
        throw err
      });
    },

    refreshPosts({ commit }) {
      commit('UPDATE_POSTKEY');
    },

    setUnseenPosts(ctx, posts) {
      const profileId = sessionStorage.getItem('profileId');
      const unseenPostsList =[];
      
      posts.forEach(post => {
        const hasSeen = post.seenBy.includes(profileId);
        const ownsPost = post.profileId === Number(profileId) ? true : false;

        if( !hasSeen && !ownsPost ) {
          unseenPostsList.push(post.id);
        }
      });

      ctx.commit('SET_UNSEEN_POSTS', unseenPostsList);

    },
    updateUnseenPosts(ctx, postId){
      const url = ctx.state.API + 'post/' + postId;
      const headers = { 
        'authorization': 'Bearer' + ' ' +  window.sessionStorage.getItem('auth'),
        'Content-Type': 'application/json'
      };
      const profileId =  Number(sessionStorage.getItem('profileId'));
      
      // Update DB
      fetch(url, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ profileId })
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw res.status;
        }
      })
      .then(() => {
        ctx.commit('REMOVE_SEEN_POST', postId);
      })
      .catch((err) => {
        throw err
      })
    }
  },
  modules: {
  }
})
