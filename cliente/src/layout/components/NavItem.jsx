import PropTypes from 'prop-types';
import { Avatar, Box, Chip, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { forwardRef, useEffect } from "react"
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { useMenuStore } from '../../hooks'

export const NavItem = ({ drawerWidth = 240, item, level }) => {

    const theme = useTheme();
    const { isOpenMenu, openItem, selectItem } = useMenuStore()


    let itemTarget = '_self';

    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };

    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: isOpenMenu ? '1rem' : '1.25rem' }} /> : false;

    const onSelectItem = (id) => {
        selectItem(id)
    }

    const isSelected = openItem.findIndex((id) => id === item.id) > -1;

    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            selectItem(item.id)
        }
    }, [item.id]);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <Box >
            <ListItemButton
                {...listItemProps}
                disabled={item.disabled}
                onClick={() => onSelectItem(item.id)}
                selected={isSelected}
                sx={{
                    zIndex: 1201,
                    pl: isSelected ? `${level * 28}px` : 1.5,
                    py: !isSelected && level === 1 ? 0.5 : 0.75,
                    ...(isSelected && {
                        '&:hover': {
                            bgcolor: 'primary.lighter'
                        },
                        '&.Mui-selected': {
                            bgcolor: 'primary.lighter',
                            borderRight: `2px solid ${theme.palette.primary.main}`,
                            color: iconSelectedColor,
                            '&:hover': {
                                color: iconSelectedColor,
                                bgcolor: 'primary.lighter'
                            }
                        }
                    }),
                    ...(!isSelected && {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        '&.Mui-selected': {
                            '&:hover': {
                                bgcolor: 'transparent'
                            },
                            bgcolor: 'transparent'
                        }
                    })
                }}
            >
                {itemIcon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 28,
                            color: isSelected ? iconSelectedColor : textColor,
                            ...(!isSelected && {
                                borderRadius: 1.5,
                                width: 36,
                                height: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    bgcolor: 'secondary.lighter'
                                }
                            }),
                            ...(!isSelected &&
                                isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter'
                                }
                            })
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={
                        <Typography
                            variant="h7"
                            sx={{ color: isSelected ? iconSelectedColor : textColor }}
                        >
                            {item.title}
                        </Typography>
                    }
                />
                {/* {(isOpenMenu || (isOpenMenu && level !== 1)) && (

                )} */}
                {(isSelected || (!isSelected && level !== 1)) && item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </ListItemButton>
        </Box>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};