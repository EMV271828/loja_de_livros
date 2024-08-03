import {Link} from "react-router-dom";


const dropDownItem = (props: { title: string, link: string, index: number }) => {

    return (
        <>
            <li>
                <Link className={`dropdown-item ${props.index === 2 ? "" : "disabled"}`} to={`/${props.link}`}>
                    {props.title}
                </Link>
            </li>
        </>
    );
}

export default dropDownItem