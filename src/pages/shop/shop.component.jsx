import React from 'react'
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import updateCollections from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {

    unsubcribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubcribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);   
            updateCollections(collectionsMap);
        });
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        );
    }
} 


const mapStateToDispatch = dispatch => ({
    updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapStateToDispatch)(ShopPage);