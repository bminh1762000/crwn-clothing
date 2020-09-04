import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchingCollectionsStart = () => ({
   type : ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchingCollectionSuccess = collectionsMap => ({
   type : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
   payload : collectionsMap
});

export const fetchingCollectionFailure = errorMessage => ({
   type : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
   payload : errorMessage
});

export const fetchingCollectionsAsync = () => {
   return dispatch => {
      const collectionRef = firestore.collection('collections');
      dispatch(fetchingCollectionsStart());

      collectionRef.get().then(snapshot => {
          const collectionsMap = convertCollectionsSnapshotToMap(snapshot);   
          dispatch(fetchingCollectionSuccess(collectionsMap));
      }).catch(error => dispatch(fetchingCollectionFailure(error.message)));
   }
};
