import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCount = () => {
  const notify = () => toast("User count: 0");
  useEffect(() => {});
  return (
    <>
      <div className="usercount-component" onClick={notify}>
        0
      </div>
      <ToastContainer position="top-center" limit={2} />
    </>
  );
};

export default UserCount;
