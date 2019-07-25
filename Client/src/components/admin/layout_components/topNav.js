import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const requests = [
  { link: "#", name: "--- Request ---" },
  { link: "/admin/quotationslist", name: "-Quotation-" },
  { link: "/admin/invoicelist", name: "-Invoice-" },
  { link: "", name: "-Bank Details-" }
];

const suppliers = [
  { link: "#", name: "--- Supliers ---" },
  { link: "/admin/newsupplier", name: " New Supplier" },
  { link: "/admin/supplierlist", name: "Suppliers List" }
];

const TopNav = props => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [open1, setOpen1] = useState(false);
  const anchorRef1 = useRef(null);
  const [selectedIndex1, setSelectedIndex1] = useState(0);

  // REQUESTS
  function handleClick() {}

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }
  //££££££££££££££££££££££££££££££

  // SUPPLIERS
  function handleClick1() {}

  function handleMenuItemClick1(event, index) {
    setSelectedIndex1(index);
    setOpen1(false);
  }

  function handleToggle1() {
    setOpen1(prevOpen => !prevOpen);
  }

  function handleClose1(event) {
    if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
      return;
    }

    setOpen1(false);
  }
  // ££££££££££££££££££

  return (
    <Grid container justify="center" spacing={5}>
      <Grid item>
        <ButtonGroup
          variant="contained"
          color="secondary"
          ref={anchorRef1}
          aria-label="Split button"
        >
          <Button onClick={handleClick1}>
            {suppliers[selectedIndex1].name}
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            aria-owns={open1 ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle1}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open1}
          anchorEl={anchorRef1.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose1}>
                  <MenuList>
                    {suppliers.map((option, index) => (
                      <Link key={index} to={suppliers[index].link}>
                        <MenuItem
                          disabled={index === 0}
                          selected={index === selectedIndex1}
                          onClick={event => handleMenuItemClick1(event, index)}
                        >
                          {option.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>

      <Grid item>
        <Button variant="contained" color="secondary" fullWidth>
          Messaging
        </Button>
      </Grid>

      <Grid item>
        <ButtonGroup
          variant="contained"
          color="secondary"
          ref={anchorRef}
          aria-label="Split button"
        >
          <Button onClick={handleClick}>{requests[selectedIndex].name}</Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {requests.map((option, index) => (
                      <Link key={index} to={requests[index].link}>
                        <MenuItem
                          disabled={index === 0}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}
                        >
                          {option.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>

      <Grid item>
        <Button variant="contained" color="secondary" fullWidth>
          Tokens
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopNav;
