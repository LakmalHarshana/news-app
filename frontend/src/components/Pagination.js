import * as React from "react";
import { Pagination } from "@material-ui/lab";
// import { Stack } from "@material-ui/lab";

export default function PaginationControlled(props) {
  const { page, count, handlePageChange } = props;

  return (
    <div style={{ marginLeft: "430px", marginTop: "50px" }}>
      <Pagination
        color="primary"
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
