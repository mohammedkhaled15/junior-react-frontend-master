import React from "react";
//using HOC to make it able to access params in clasc component
import { useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter;
