const initialData = {
    requests: []
  };
  
  export const requestsReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'GET_ALL_REQUESTS':{
        return{
          ...state,
          requests:action.payload
        }
    }
      default:return state;
    }
  };
  