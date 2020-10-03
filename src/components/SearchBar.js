import React, { useEffect, useState } from "react";
import '../styles/search-bar.css';

const SearchBar = ({ campaignList, setFilteredCampaignList }) => {
    const styles = {
        search: 'search',
        searchWrapper: 'search-wrapper',
        searchButton: 'search-button',
    };

    const [ search, setSearch ] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const filteredList = [];
            const unFilteredList = [];
             campaignList.forEach(campaign => {
                 if (campaign.name.includes(search.toUpperCase())) filteredList.push(campaign);
                 else unFilteredList.push(campaign);
             }
            );
            setFilteredCampaignList(search, filteredList.concat(unFilteredList));
        }, 1000);
    }, [search]);

    return (
        <div className={styles.searchWrapper}>
            <input type='text' value={search} onChange={e => setSearch(e.target.value)} className={styles.search}/>
            <div className={styles.searchButton}>Search Here</div>
        </div>
    );
}

export default SearchBar;