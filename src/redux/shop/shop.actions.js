import ShopActionTypes from './shop.types';

const updateCollections = (collectionsMap) =>({
   type : ShopActionTypes.UPDATE_COLLECTIIONS,
   payload : collectionsMap
});

export default updateCollections;