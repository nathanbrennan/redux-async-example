import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../../actions.js'

const initialState = {
  selectedSubreddit: '',
  entities: {
    users: {},
    posts: {}
  },
  postsBySubreddit: {}
}

const rootReducer = (state = initialState, action) => {
  return {
    selectedSubreddit: selectedSubreddit(state.selectedSubreddit, action),
    entities: entities(state.entities, action),
    postsBySubreddit: postsBySubreddit(state.postsBySubreddit, action)
  }
}

export default rootReducer

/* EXAMPLE STATE...
{
  selectedSubreddit: 'frontend',
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
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
