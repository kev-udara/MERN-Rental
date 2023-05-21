const initialData = {
    accessories : []
};

export const accessoriesReducer = (state=initialData, action)=>{

    switch(action.type)
    {
        case 'GET_ALL_ACCESSORIES':{
            return{
                ...state,
                accessories:action.payload
            }
        }
        default:return state
    }
}