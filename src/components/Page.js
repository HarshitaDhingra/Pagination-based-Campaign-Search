import React from 'react';

import '../styles/page.css'

const Page = ({ content, searchString, deleteCampaign }) => {
    const styles = {
        pageWrapper: 'page-wrapper',
        campaignName: 'campaign-name',
    };

    if(!content.length) return (
        <div>No campaign found...</div>
    );

  return (
      <div className={styles.pageWrapper}>
      <table>
          <thead>
          <tr>
              <td>Campaign Name</td>
              <td>Campaign Type</td>
              <td>Company</td>
              <td> </td>
          </tr>
          </thead>
          <tbody>
          {content.map((campaign, index) => (
                  <tr key={index}>
                      <td className={styles.campaignName}><span dangerouslySetInnerHTML={{ __html: campaign.name.replace(searchString, `<b>${searchString}</b>`) }} /></td>
                      <td>{campaign.type}</td>
                      <td>{campaign.company}</td>
                      <td>
                          <button title="Delete campaign" onClick={() => deleteCampaign(campaign._id)}>
                              <img src={'https://www.iconfinder.com/data/icons/single-width-stroke/24/oui-icons-05-512.png'} height="20px" width="15px" alt={'bin'} />
                          </button>
                      </td>
                  </tr>
              )
          )}
          </tbody>
      </table>
      </div>
  )
};


export default Page;
