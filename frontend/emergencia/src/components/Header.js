import Box from '@mui/material/Box';
import Logo from '../img/noun-phone-165755.png';
import { Typography } from '@mui/material';



function Header(){
    return(
        <Box sx={{
        backgroundColor: '#F4F4F4',
        boxShadow:2,
        width:1, 
        height: 120, 
        display:'flex',
        alignItems: 'center'}}>
            <img src={Logo} alt="logo" width={70} height={60}/>
            <Typography variant='h2'style={{color:'#262626'}}>EMERGENC</Typography>
            <Typography variant='h2' style={{color:'#D4392D'}}>IA</Typography>
        </Box>
    );
}
export default Header;