import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (token) => {
        const res = await axios.get('http://localhost:3000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
);
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async ({ task, token }) => {
        const res = await axios.post('http://localhost:3000/api/tasks', task, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
);
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ task, token, id }) => {
    const res = await axios.put(`http://localhost:3000/api/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);


const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.list.findIndex((t) => t._id === updated._id);
                if (index !== -1) {
                    state.list[index] = updated;
                }
            });
    },
});

export default taskSlice.reducer;
