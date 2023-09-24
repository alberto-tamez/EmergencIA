import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const emocion1 = 'Tristeza';
const emocion2 = 'Miedo';
const emocion3 = 'Enojo';

function getRandomColor() {
  // Generate a random color in hexadecimal format
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function Emociones() {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();

  const emocionStyle = {
    height: 30,
    width: 130,
    bgcolor: '#E6E6E6',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 1,
    gap: 1,
  };

  const colorStyle = (color) => ({
    width: 20,
    height: 20,
    bgcolor: color,
    borderRadius: '40%',
  });

  return (
    <Box
      sx={{
        height: 150,
        width: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
        border: 1,
      }}
    >
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(randomColor1)}></Box>
        <Typography>{emocion1}</Typography>
      </Box>
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(randomColor2)}></Box>
        <Typography>{emocion2}</Typography>
      </Box>
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(randomColor3)}></Box>
        <Typography>{emocion3}</Typography>
      </Box>
    </Box>
  );
}

export default Emociones;
