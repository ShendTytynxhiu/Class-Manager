import React from "react";
import { connect } from "react-redux";
import { userSignOut } from "../../../redux/Auth/auth.actions";

import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";

function Header(props) {
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        {props.auth_token == "" ? (
          <Button variant="contained" size="small" href="/sign-up/">
            Sign up
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => props.userSignOut()}
          >
            Sign Out
          </Button>
        )}
      </Toolbar>
      <hr />
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth_token: state.auth.auth_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSignOut: () => dispatch(userSignOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
