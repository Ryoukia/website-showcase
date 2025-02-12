import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./FilterDropdown.css";
import { RecipeFilters } from "./RecipeFilters";

export const FilterDropdown = ({ modelFilters }) => {
  const [open, setOpen] = useState(false);
  const [buttonName, setButtonName] = useState('Filter')

  return (
    <>
      <Button
        className="filter-button"
        variant="primary"
        onClick={(e) => {
          setOpen(!open);
          if (buttonName == "Filter"){
            setButtonName("Close Filters")
          } else {
            setButtonName("Filter")
          }
          
        }}
      >
        {buttonName}
      </Button>

      {open && <>{modelFilters}</>}
    </>
  );
};
