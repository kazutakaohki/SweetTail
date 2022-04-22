const MyImage = (props) => {
  let fname = "./" + props.fname;
  let wide = props.wide + "px";
  let high = props.high + "px";

  return <img height={high} width={wide} border="0" src={fname} />;
};

export default MyImage;
