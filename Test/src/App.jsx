import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PostPage from './PostPage';
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

const App = () => (
  <Provider store={store}>
    <PostPage />
  </Provider>
);

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
