import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = (props) => {

  const { sections } = props;
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          XYZ Forums
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="right"
          noWrap
          sx={{ flex: 1 }}
        >
          Welcome, {user.name}
        </Typography>
        <Button
          onClick={() => navigate("/logout")}
          variant="outlined"
          size="small"
          sx={{ mx: 3 }}
        >
          Logout
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ overflowX: "auto", gap: 3 }}
      >
        {sections.map((section) => (
          <Link key={section.title} variant="body2" to={section.url}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Header;