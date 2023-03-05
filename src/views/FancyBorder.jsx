function FancyBorder(props) {
  return <div className={'Fancyborder-' + props.color}>{props.children}</div>
}

export default FancyBorder
