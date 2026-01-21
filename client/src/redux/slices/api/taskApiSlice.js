import { apiSlice } from "../apiSlice.js";

const TASK_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTask: builder.query({
      query: ({ stage, isTrashed, search }={}) => {
       const params = new URLSearchParams();
       if(stage) params.append("stage",stage);
       if(isTrashed) params.append("isTrashed",isTrashed);
       if(search) params.append("search",search);

       return {
        url:`${TASK_URL}?${params.toString()}`,
        method:"GET",
        credentials:"include"
       }
      },
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getTaskDetail: builder.query({
      query: ({ id }) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    trashTask: builder.mutation({
      query: (task) => ({
        url: `${TASK_URL}/${task._id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getTrashedTask:builder.mutation({
      query:()=>({
        url:`${TASK_URL}/trashed-tasks`,
        method:'GET',
        credentials:true
      })
    })
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDuplicateTaskMutation,
  useGetTaskDetailQuery,
  useTrashTaskMutation,
  useGetTrashedTaskMutation
} = taskApiSlice;
