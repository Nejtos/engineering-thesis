import "./Button.css";

const Button = ({ buttonContent, clickEffect , style}) => {

  return (
    <div className="ButtonExterior" type={buttonContent} style={style}> 
      <button className="Button" type={buttonContent} onClick={clickEffect}>
        <div className="ButtonInterior">{buttonContent.includes('img') ? null : buttonContent }</div>
      </button>
    </div>
  );
};

export default Button;