import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import Subheader from 'material-ui/Subheader';

/**
 * DashboardDrawer component
 * this function returns a single React element ie. native DOM component
 * @param {object} props this constains paramters passed into the Component
 * @return {React.Component} [A react componet element]
 */
const DashboardDrawer = (props) => {
  const decoded = jwt(localStorage.getItem('jwt-token'));
  let AdminStyle;
  if (decoded.id === 1) {
    AdminStyle = {
      display: ''
    };
  } else {
    AdminStyle = {
      display: 'none'
    };
  }
  return (
    <Drawer
docked={false}
width={300}
open={props.open}
onRequestChange={() => props.closeDrawer()}
>
      <List>
        <Subheader>Welcome, {decoded.username}</Subheader>
        <Link to="/"><ListItem
        primaryText="Home"
        leftIcon={<ActionHome />}
        /></Link>
        <Link to="/create-document"><ListItem
      primaryText="Create A Document"
      leftIcon={<ActionChromeReaderMode />} /></Link>
        <Link to="/user-documents"><ListItem
      primaryText="View Your Documents"
      leftIcon={<ContentFilterList />}
      /></Link>
        <ListItem
        style={AdminStyle}
      primaryText="Admin Actions"
      leftIcon={<ContentInbox />}
      primaryTogglesNestedList
      nestedItems={[
        <Link key={1} to="/dash-users"><ListItem
          primaryText="View All Users"
          leftIcon={<ActionList />}
        /></Link>,
        <Link key={2} to="/admin-documents"><ListItem
          primaryText="View All Documents"
          leftIcon={<ContentFilterList />}
        /></Link>,
      ]}
    />
      </List>
    </Drawer>
  );
};


DashboardDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

DashboardDrawer.default = {
  open: false
};

export default DashboardDrawer;