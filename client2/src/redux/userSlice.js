import { createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        cust_id:"C05cd",
        cust_name:"Nont123",
        email:"nont@gmail.com",
        password:"123",
        // role:"admin"
    },
    reducers:{
        update: (state,action) =>{
            state.name=action.payload.cust_name;
            state.email=action.payload.email;
            state.cust_id=action.payload.cust_id;

        }
    }
});

export const {update} = userSlice.actions;
export default userSlice.reducer;