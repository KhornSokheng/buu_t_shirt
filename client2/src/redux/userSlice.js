import { createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        cust_id:"C9999",
        cust_name:"NONT",
        email:"nont@gmail.com",
        role:"admin",
        profile_img:"https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",

    },
    reducers:{
        update: (state,action) =>{
            state.cust_name=action.payload.cust_name;
            state.email=action.payload.email;
            state.cust_id=action.payload.cust_id;
            state.role=action.payload.role;
            state.profile_img=action.payload.profile_img;

        }
    }
});

export const {update} = userSlice.actions;
export default userSlice.reducer;