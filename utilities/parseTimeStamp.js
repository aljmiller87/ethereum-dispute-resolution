export default function (solidityTimeStamp) {
  const ms = +solidityTimeStamp * 1000;
  const date = new Date(ms);
  return date.toLocaleDateString();
}
