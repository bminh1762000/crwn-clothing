import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import DirectoryContainer from "../../components/directory/directory.container";
import { selectDirectorySections } from "../../redux/directory/directory.selector";
import { fetchDirStart } from "../../redux/directory/directory.actions";

import { HomePageContainer } from "./homepage.styles";

const HomePage = ({ fetchDirStart, directory }) => {
  useEffect(() => {
    if (directory.length <= 0) {
      fetchDirStart();
    }
  });
  return (
    <HomePageContainer>
      <DirectoryContainer />
    </HomePageContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchDirStart: () => dispatch(fetchDirStart()),
});

const mapStateToProps = createStructuredSelector({
  directory: selectDirectorySections,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
