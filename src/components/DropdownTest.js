import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Drop = ({ buttonDropdownName, actionsArray }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} color="warning">
      <DropdownToggle caret>{buttonDropdownName}</DropdownToggle>
      <DropdownMenu>
        {actionsArray.map((action) => (
          <DropdownItem onClick={action.function}>{action.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Drop;
