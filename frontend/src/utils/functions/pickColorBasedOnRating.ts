const pickColorBasedOnRating = (rating: number) => {
  const roundedNumber = Math.round(rating);

  let color = "";

  switch (roundedNumber) {
    case 5:
      color = "#007f5f";
      break;
    case 4:
      color = "#55a630";
      break;
    case 3:
      color = "#d4d700";
      break;
    case 2:
      color = "#e85d04";
      break;
    case 1:
      color = "#d00000";
      break;
  }
  return color;
};

export default pickColorBasedOnRating;
