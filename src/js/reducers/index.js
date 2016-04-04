import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../../actions.js'

const initialState = {
  selectedSubreddit: '',
  usersById: {},
  postsById: {}
  postsBySubreddit: {}
}

const selectedSubreddit = (state = 'games', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      state = action.subreddit
      break;
    default:
      state
  }
}

const postsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, action.posts)
      break;
    default:
      state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      // YOU ARE HERE
      // YOU ARE HERE
      // YOU ARE HERE
      // YOU ARE HERE
      break
    case RECEIVE_POSTS:
      //...
      break
    case INVALIDATE_SUBREDDIT:
      //...
      break
    default:
      state
  }
}

const rootReducer = (state = initialState, action) => {
  return {
    selectedSubreddit: selectedSubreddit(state.selectedSubreddit, action),
    usersById: usersById(state.usersById, action),
    postsById: postsById(state.postsById, action),
    postsBySubreddit: postsBySubreddit(state.postsBySubreddit, action)
  }
}

export default rootReducer

/* EXAMPLE STATE...
{
  selectedSubreddit: 'frontend',
  usersById: {
    2: {
      id: 2,
      name: 'Andrew'
    }
  },
  postsById: {
    42: {
      id: 42,
      title: 'Confusion about Flux and Relay',
      author: 2
    },
    100: {
      id: 100,
      title: 'Creating a Simple Application Using React JS and Flux Architecture',
      author: 2
    }
  },
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  }
}
*/
