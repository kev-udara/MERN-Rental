const initialData = {
    bookings: [],
  };
  
  export const bookingsReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'GET_ALL_BOOKINGS':
        return {
          ...state,
          bookings: action.payload,
        };
      case 'UPDATE_BOOKING_STATUS':
        const updatedBookings = state.bookings.map((booking) => {
          if (booking._id === action.payload._id) {
            return {
              ...booking,
              status: action.payload.status,
            };
          } else {
            return booking;
          }
        });
        return {
          ...state,
          bookings: updatedBookings,
        };
      default:
        return state;
    }
  };
  