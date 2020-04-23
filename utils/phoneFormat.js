export default function phoneFormat(phone) {
  const regex = phone.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
  return (
    "+" +
    regex[1] +
    " (" +
    regex[2] +
    ") " +
    regex[3] +
    "-" +
    regex[4] +
    "-" +
    regex[5]
  );
}
