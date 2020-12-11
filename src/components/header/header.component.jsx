import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import {signOutStart} from '../../redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/crwn-clothing">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/crwn-clothing/shop">SHOP</OptionLink>
            <OptionLink to="/crwn-clothing/contact">CONTACT</OptionLink>
            {currentUser ? (
                <OptionLink as="div" onClick={signOutStart}>
                    SIGN OUT
                </OptionLink>
            ) : (
                <OptionLink to="/crwn-clothing/signin">SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  hidden : selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart : () => dispatch(signOutStart())
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);
