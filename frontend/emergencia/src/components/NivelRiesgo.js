import Box from '@mui/material/Box';
function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
const nivelOpaciadad=(nivel,color,nivelMin)=>{
    if(nivel>=nivelMin){
        return color;
    }else{
        return addAlpha(color,0.2);
    }
}

function NivelRiesgo(props){
    const nivel = props.nivel;
    return(
        <Box sx={{
            height: 150,
            width: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border:1,
        }}>
            <Box sx={{
                bgcolor: nivelOpaciadad(nivel,'#540804',0.9),
                width: 50,
                height: 35,
                borderRadius: '5px 5px 0 0',
            }}></Box>
            <Box sx={{
                bgcolor: nivelOpaciadad(nivel,'#81171B',0.6),
                width: 50,
                height: 30,
            }}></Box>
            <Box sx={{
                bgcolor: nivelOpaciadad(nivel,'#CA3C31',0.5),
                width: 50,
                height: 25,
            }}></Box>
            <Box sx={{
                bgcolor: nivelOpaciadad(nivel,'#C75146',0.3),
                width: 50,
                height: 20,
            }}></Box>
            <Box sx={{
                bgcolor: nivelOpaciadad(nivel,'#D3751E',0.1),
                width: 50,
                height: 15,
                borderRadius: '0 0 5px 5px',
            }}></Box>
        </Box>

    );
}

export default NivelRiesgo;