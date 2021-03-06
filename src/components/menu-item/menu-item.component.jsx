import React from 'react'

import { withRouter } from 'react-router-dom';

import { MenuItemContainer, BackgroundImage, ContentContainer, Title, Subtitle } from './menu-item.styles'

const MenuItem = ({ title, imageUrl, size, linkUrl, match, history }) => (
  <MenuItemContainer
    className={`${size}`}
    onClick={() => history.push(`${match.path}${linkUrl}`)}
  >
    <BackgroundImage
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <ContentContainer>
      <Title>{title.toUpperCase()}</Title>
      <Subtitle>SHOP NOW</Subtitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
