import Box from '@mui/material/Box';
import Logo from '../img/noun-phone-165755.png';
import { Typography } from '@mui/material';

const titleStyle = {
        fontWeight: 'bold',
        fontStretch: 'condensed'
}

function Header(){
    return(
        <Box sx={{
        backgroundColor: '##f8f8ff',
        boxShadow:2,
        width:1, 
        height: 120, 
        display:'flex',
        alignItems: 'center'}}>
            <img src={Logo} alt="logo" width={70} height={60}/>
            <Typography variant='h3' sx={titleStyle}>EMERGENC</Typography>
            <Typography variant='h3' sx={titleStyle}>IA</Typography>
        </Box>
    );
}
export default Header;