import React, { useEffect } from "react";
import { connect } from "react-redux";

import DirectoryContainer from "../../components/directory/directory.container";
import { fetchDirStart } from "../../redux/directory/directory.actions";

import { HomePageContainer } from "./homepage.styles";

const HomePage = ({ fetchDirStart }) => {
  useEffect(() => {
    fetchDirStart();
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

export default connect(null, mapDispatchToProps)(HomePage);
