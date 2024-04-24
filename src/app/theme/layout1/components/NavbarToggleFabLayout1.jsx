import NavbarToggleFab from "../../shared-components/navbar/NavbarToggleFab";
import LayoutConfig from "../Layout1Config";

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props) {
  const { className } = props;
  const { defaults: config } = LayoutConfig;
  // const dispatch = useAppDispatch();
  return (
    <NavbarToggleFab
      className={className}
      onClick={() => {
        // dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
      }}
      position={config.navbar.position}
    />
  );
}

export default NavbarToggleFabLayout1;
