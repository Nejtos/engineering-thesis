import "./Button.css"

const Button = ({id, content, clickEvent}) => {
    return (
        <>
            <button className="btn" id={id} onClick={clickEvent}>{content}</button>
        </>
    )
}
export default Button;