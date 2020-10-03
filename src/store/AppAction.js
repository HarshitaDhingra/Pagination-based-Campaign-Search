import AppActionTypes from "./AppActionTypes";

const AppAction = {
    setCampaignsData: payload => ({
        type: AppActionTypes.SAVE_CAMPAIGN_DATA,
        payload
    }),
    fetchCampaigns: () => (dispatch) => {
        fetch('https://run.mocky.io/v3/0f0e690d-1007-4228-9bc5-be6fa5507d93')
            .then(response => response.json())
            .then(content => {
                dispatch(AppAction.setCampaignsData(content));
            });
    },
    removeCampaign: (id) => (dispatch, getState) => {
        const { campaignList } = getState().appReducer;
        const updatedList = campaignList.filter(campaign => campaign._id !== id);
        dispatch(AppAction.setCampaignsData(updatedList));
    },
};

export default AppAction;