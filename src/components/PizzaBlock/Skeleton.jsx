import React from "react"
import ContentLoader from "react-content-loader"

const Selecton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ebebeb"
    {...props}
  >
    <rect x="0" y="263" rx="10" ry="10" width="280" height="26" /> 
    <rect x="0" y="308" rx="10" ry="10" width="280" height="81" /> 
    <rect x="0" y="409" rx="10" ry="10" width="95" height="30" /> 
    <rect x="128" y="400" rx="25" ry="25" width="152" height="45" /> 
    <circle cx="140" cy="132" r="115" />
  </ContentLoader>
)

export default Selecton;

