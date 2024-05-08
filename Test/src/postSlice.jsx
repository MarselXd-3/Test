import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPostIndex: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentPostIndex(state, action) {
      state.currentPostIndex = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPostIndex } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const selectCurrentPostIndex = (state) => state.posts.currentPostIndex;

export default postSlice.reducer;
