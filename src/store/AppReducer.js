import AppActionTypes from './AppActionTypes';

const initialState = {
 isFetched: false,
  campaignList: [],
};

const AppReducer = (state = initialState, action) => {
    switch (action.type){
        case AppActionTypes.SAVE_CAMPAIGN_DATA:
            return {
                ...state,
                campaignList: action.payload,
                isFetched: true
            };
        default:
            return state;
    }
}

export default AppReducer;