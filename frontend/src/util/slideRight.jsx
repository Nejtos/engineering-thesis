export const slideRight = (props) => {
    const prefix = "\".";
    const suffix = "\"";
    const str = props;
    let result = [prefix, str, suffix].join('');
    result = result.slice(1, -1);
    // console.log(result)
    // console.log(document.querySelector(result))
    let slider;
    result ? slider = document.querySelector(result) : null
    slider ? slider.scrollLeft += 231 : null
    // const slider = document.getElementById("top-day-sellings-slider");
    // slider.scrollLeft += 231;
};
