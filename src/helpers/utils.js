
const normalizedList = (campaignsContent) => {
    const updatedList = {};
    campaignsContent.forEach(campaign => {
        const { _id, ...data } = campaign;
        updatedList[_id] = {
            ...data
        };
    });
    return updatedList;
}


export { normalizedList };