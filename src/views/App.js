import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { SearchBar, Page } from "../components";
import AppAction from "../store/AppAction";

import '../styles/app.css'

const App = ({ isFetched, campaignList, fetchCampaigns, removeCampaign, setCampaignsData }) => {

  const styles = {
    appWrapper: 'app-wrapper',
    pageIndex: 'page-index',
    pageIndicesWrapper: 'page-indices-wrapper',
    currentIndex: 'page-current-index',
  };
  const pageIndexStyles = (index = -1) => classNames(styles.pageIndex, {
    [styles.currentIndex]: index === currentPageIndex
  });

  useEffect (() => {
    fetchCampaigns();
  }, []);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [searchString, setSearchString] = useState('');

  const campaignCount = campaignList.length;
  const pageCount = Math.ceil(campaignCount/10);

  const leftNavigate = () => { setCurrentPageIndex(currentPageIndex-1) };
  const rightNavigate = () => { setCurrentPageIndex(currentPageIndex+1) };

  const pageCountBar = () => {
    const navigationBar = [];
    for(let index = 0; index < pageCount; index++) {
      navigationBar.push(<button className={pageIndexStyles(index)} onClick={() => setCurrentPageIndex(index)}>{index}</button>)
    }
    return navigationBar;
  };

  const navigationBar = () => {
    const lastPageIndex = pageCount-1;
    return (
        <div className={styles.pageIndicesWrapper}>
          <button disabled={currentPageIndex === 0} className={pageIndexStyles()} onClick={leftNavigate}>&lt;</button>
          {pageCountBar()}
          <button disabled={currentPageIndex === lastPageIndex} className={pageIndexStyles()} onClick={rightNavigate}>&gt;</button>
        </div>
    )
  };
  if(isFetched) {
    const beginningIndex = currentPageIndex*10;
    const currentPageList = campaignList.slice(beginningIndex, beginningIndex+10);
    if(!currentPageList.length && campaignList.length) setCurrentPageIndex(currentPageIndex-1);
    return (
        <div className={styles.appWrapper}>
          <SearchBar
              campaignList={campaignList}
              setFilteredCampaignList={(searchStr, list) => {
                setSearchString(searchStr);
                setCurrentPageIndex(0);
                setCampaignsData(list)}
              }
          />
          <Page
              searchString={searchString}
              content={currentPageList}
              deleteCampaign={(index) => removeCampaign(index)}
          />
          {pageCount>1 && navigationBar()}
        </div>
    );
  }
  return "Loading....";
};


const mapStateToProps = (state) => {
  return {
    campaignList: state.appReducer.campaignList,
    isFetched: state.appReducer.isFetched,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCampaigns: () => {
    dispatch(AppAction.fetchCampaigns());
  },
  removeCampaign: payload => {
    dispatch(AppAction.removeCampaign(payload))
  },
  setCampaignsData: payload => {
    dispatch(AppAction.setCampaignsData(payload))
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);