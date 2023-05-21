const initialData = {
    reports: [],
  };
  
  export const reportsReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'GET_ALL_REPORTS':
        return{
          ...state,
          reports: action.payload,
        };
        case 'UPDATE_REPORT_STATUS':
        const updatedReports = state.reports.map((report) => {
          if (report._id === action.payload._id) {
            return {
              ...report,
              status: action.payload.status,
            };
          } else {
            return report;
          }
        });
        return {
          ...state,
          reports: updatedReports,
        };
      default:return state;
    }
  };
  