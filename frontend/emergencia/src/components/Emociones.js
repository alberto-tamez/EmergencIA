import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const emocion1 = 'tristeza';
const emocion2 = 'sorpresa';
const emocion3 = 'enojo';

function capitalizeFirstLetter(str) {
  // Check if the input string is empty or null
  if (!str) return '';

  // Capitalize the first letter and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function getColor(emocion) {
  var dictionary = {
      'alivio': '#00FF00',
      'alegria': '#FFD700',
      'amor': '#FF1493',
      'sorpresa': '#4B0082',
      'neutral': '#808080',
      'felicidad': '#32CD32',
      'enojo': '#FF0000',
      'tristeza': '#0000FF',
      'miedo': '#FFA500',
      'asco': '#8B0000',
      'negativo': '#800080',
      'preocupacion': '#FFFF00',
      'odio': '#800000',
  };
  return dictionary[emocion];
}

function Emociones(props) {
  
  const color1 = getColor(props.emociones[0]);  
  const color2 = getColor(props.emociones[1]);
  const color3 = getColor(props.emociones[2]);

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
        width: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(color1)}></Box>
        <Typography>{capitalizeFirstLetter(emocion1)}</Typography>
      </Box>
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(color2)}></Box>
        <Typography>{capitalizeFirstLetter(emocion2)}</Typography>
      </Box>
      <Box sx={emocionStyle}>
        <Box sx={colorStyle(color3)}></Box>
        <Typography>{capitalizeFirstLetter(emocion3)}</Typography>
      </Box>
    </Box>
  );
}

export default Emociones;
