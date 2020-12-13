import React from "react";
import {
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function Header(props) {

    let match = useRouteMatch();

    // class = back-bar
  return (
  <>
        <Link to={`${match.url}/${props.next}`}>&larr;&nbsp;Newer</Link>
        | <Link to="/">Home <small>[esc]</small></Link> |
        <Link to={`${match.url}/${props.prev}`}>Older&nbsp;&rarr;</Link>
    </>
  );
}
