import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';


const initialState = {
  pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtopaste: (state,action) => {
     const pastes=action.payload;
     state.pastes.push(pastes);
     localStorage.setItem('pastes',JSON.stringify(state.pastes));
     toast.success('Paste Created Successfully');
    },
    updatetopaste: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((p)=>p._id===paste._id);
      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success('Paste Updated Successfully');
      }
    },
    resettopaste: (state, action) => {
      state.pastes=[];
      localStorage.removeItem('pastes');
    },
    removefrompaste: (state, action) => {
      const pasteId=action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((p)=>p._id===pasteId);
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success('Paste Deleted Successfully');
      }
    },
  },
})


export const { addtopaste, updatetopaste,resettopaste,removefrompaste  } = pasteSlice.actions

export default pasteSlice.reducer