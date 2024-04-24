import { Link } from "@tanstack/react-router";
import { forwardRef } from "react";
/**
 * The NavLinkAdapter component is a wrapper around the React Router NavLink component.
 * It adds the ability to navigate programmatically using the useNavigate hook.
 * The component is memoized to prevent unnecessary re-renders.
 */
const NavLinkAdapter = forwardRef((props, ref) => {
  const {
    role = "button",
    ..._props
  } = props;
  return (
    <Link
      ref={ref}
      role={role}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {..._props}
    >
      {props.children}
    </Link>
  );
});

NavLinkAdapter.displayName = "NavLinkAdapter";

export default NavLinkAdapter;
