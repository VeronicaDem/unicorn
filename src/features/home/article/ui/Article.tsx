import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Favorite from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';
const useStyles = () => ({
    root: {
        overflow: 'initial',
        maxWidth: 304,
        backgroundColor: 'transparent',
    },
    avatar: {
        position: 'relative',
        width: '25px',
        height: '25px'
    },
    title: {
        marginBottom: 0,
        position: 'relative',
        top: 5
    },
    content: {
        position: 'relative',
        backgroundColor: '#fff',
        borderBottomRadius: 4,
    },
    favorite: {
        position: 'absolute',
        top: 8,
        right: 12,
    },
    media: {
        position: 'relative',
        height: '150px',
        width: 'auto',
        backgroundColor: '#fff',
        borderTopRadius: 4,
    },
    text: {
        position: 'relative',
        top: 15
    }
})


export default function Article() {
    const styles = useStyles();
    return (
        <Card elevation={0} sx={styles.root}>
            <CardMedia
                sx={styles.media}
                image={
                    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
                }
            />
            <CardContent sx={styles.content}>
                <Avatar sx={styles.avatar} variant={'circular'} sizes={"small"} src={"https://www.imagensempng.com.br/wp-content/uploads/2021/08/Icone-usuario-Png.png"} />
                <IconButton sx={styles.favorite}>
                    <Favorite />
                </IconButton>
                <Typography sx={styles.title} component={"h3"}>Colloseo</Typography>


                <Typography sx={styles.text} variant={'body2'}>
                    Talking about travelling or new jobs, many people often think of
                    change of environment...
                </Typography>
                <Box
                    mt={2}
                    display={'flex'}
                    justifyContent={'flex-end'}
                    alignItems={'center'}
                >

                    <IconButton size={'small'}>
                        <MoreHoriz />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>)
}