import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsDirectoryFetching } from "../../redux/directory/directory.selector";
import Directory from "./directory.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsDirectoryFetching,
});

const DirectoryContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Directory);

export default DirectoryContainer;
