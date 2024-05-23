import { observer } from "mobx-react-lite";
import Flag from "../../assets/indian-flag.png";

const Copyright = observer(() => (
  <div className="p-8">
    <span>
      ©
      {new Date().getFullYear()}
      {" "}
      <a href="" className=" font-bold ml-2">
      Anand Rathi Global Finance LTD
      </a>
      {"  "} Made with
      <svg
        className="mx-2"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558a5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"
          fill="#ff5b5c"
        />
      </svg>
      in India
      <img src={Flag} className="ml-4 w-16 h-12" alt="indian flag" />
    </span>
  </div>
));

export default Copyright;
