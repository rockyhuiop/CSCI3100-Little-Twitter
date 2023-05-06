import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import * as React from "react";
import "./IconMenu.css";

const IconMenu = ({ names, icons, clickHandlers, keySuffix }) => {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <div className="primary">
                        <IconButton
                            size="small"
                            variant="contained"
                            {...bindTrigger(popupState)}
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </IconButton>
                    </div>
                    <Menu {...bindMenu(popupState)}>
                        <div className="menuitem">
                            {names.map((name, idx) => {
                                return (
                                    <MenuItem
                                        onClick={
                                            clickHandlers[idx] ||
                                            popupState.close
                                        }
                                        key={`popup-${idx}-${keySuffix}`}
                                    >
                                        <ListItemIcon>
                                            {icons[idx]}
                                        </ListItemIcon>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </div>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
};

export default IconMenu;
