import React from "react";
import { TableHeaderProps } from "./_types/TableHeaderProps";

export const TableHeaderScoreline: React.FC<TableHeaderProps> = ({ title }) => (
  <>
    {title ? (
      <div className="ladder-grade">
        <h2 className="ladder-grade-name">{title}</h2>
      </div>
    ) : null}
    <div className="ladder-table">
      <div className="ladder-columns" aria-hidden>
        <span>#</span>
        <span />
        <span>Team</span>
        <span>P</span>
        <span>W</span>
        <span>L</span>
        <span>B</span>
        <span>Pts</span>
      </div>
    </div>
  </>
);

export default TableHeaderScoreline;
