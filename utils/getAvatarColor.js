export default (letter) => {
  const charCode = letter.charCodeAt(0);
  if (charCode >= 1040 && charCode <= 1049) {
    return {
      background: "#dad5f8",
      color: "#816cff",
    };
  } else if (charCode >= 1050 && charCode <= 1060) {
    return {
      background: "#f5d6d9",
      color: "#f38181",
    };
  } else {
    return {
      background: "#e9f5ff",
      color: "#2a86ff",
    };
  }
};
