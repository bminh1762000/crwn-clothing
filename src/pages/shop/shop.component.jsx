import React from 'react'
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { selectIsCollectionFetching, selectCollectionsLoaded } from '../../redux/shop/shop.selector';

import { fetchingCollectionsAsync } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchingCollectionsAsync} = this.props;
        fetchingCollectionsAsync();
    }

    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render ={(props) => <CollectionPageWithSpinner isLoading={isCollectionLoaded} {...props} />} />
            </div>
        );
    }
} 

const mapStatetoProps = createStructuredSelector({
    isCollectionFetching : selectIsCollectionFetching,
    isCollectionLoaded : selectCollectionsLoaded
});

const mapStateToDispatch = dispatch => ({
    fetchingCollectionsAsync : () => dispatch(fetchingCollectionsAsync())
});

export default connect(mapStatetoProps, mapStateToDispatch)(ShopPage);