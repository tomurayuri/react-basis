type Props = {
  color: string;
  children: React.ReactNode;
};
// const ColorfulMessage = (props: Props) => {
const ColorfulMessage: React.FC<Props> = (props) => {
  console.log('--- ColorfulMessage ---');
  const { color, children } = props;
  const conetntStyle = {
    color,
    padding: '0 5px',
  };

  // ---- 方法1：propsでテキストを受け取る方法（props.massage） ----
  // return <p style={conetntStyle}>{props.message}</p>;

  // ---- 方法2：タグで囲ったものを受け取る方法（props.children） ----
  return <p style={conetntStyle}>{children}</p>;
};

export default ColorfulMessage;
