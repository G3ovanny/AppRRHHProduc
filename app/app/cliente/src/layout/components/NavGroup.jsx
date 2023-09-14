import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { Box, Divider, List, Toolbar, Typography } from '@mui/material';

// project import

import { NavItem } from './'
import { useMenuStore } from '../../hooks/';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export const NavGroup = ({ item }) => {

  const { isOpenMenu } = useMenuStore();

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });
  return (
    <Box >
      <List
        subheader={
          item.title && (
            <Box
              sx={{ pl: 3, mb: 1.5 }}>
              <Typography
                variant="subtitle2"
                color="secondary">
                {item.title}
              </Typography>
            </Box>
          )
        }
        sx={{ mb: 1.5, py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
    </Box>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

