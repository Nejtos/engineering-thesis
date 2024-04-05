export const slideLeft = (props) => {
        const prefix = "\".";
        const suffix = "\"";
        const str = props;
        let result = [prefix, str, suffix].join('');
        result = result.slice(1, -1);
        let slider;
        result ? slider = document.querySelector(result) : null
        slider ? slider.scrollLeft -= 231 : null
        // let tmp = "\".";
        // tmp += props;
        // tmp += "\""
        // let tmp2 = tmp;
        // console.log(tmp2)
        // let slider;
        // console.log(document.querySelector(".top-day-sellings-slider"))
        // tmp ? slider = document.querySelector(tmp) : null
        // slider ? slider.scrollLeft -= 231 : null
};