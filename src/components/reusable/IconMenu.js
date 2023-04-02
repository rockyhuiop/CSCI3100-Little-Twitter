import * as React from "react";
import { IconButton, ListItemIcon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import "./IconMenu.css";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Paper from "@mui/material/Paper";

export default function IconMenu() {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <div className="menubutton">
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
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faUserXmark} />
                                </ListItemIcon>
                                Unfollow
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </ListItemIcon>
                                Bookmark
                            </MenuItem>
                        </div>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
