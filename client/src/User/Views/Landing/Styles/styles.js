import { makeStyles } from '@mui/styles';
import Image from "../Images/dogger.png";

const styles = (theme) => {
    return {
        bgContainer: {
            // minHeight: "100%",
            // minWidht: "100%",
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
        },
        boxContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: "column",
            minHeight: '900px',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: "550px"
        },
        titleBox: {
            width: "100%",
            display: "flex",
            margin: "60px"
        },
        goDown: {
            color: "#87a827",
            fontSize: "large",
        },
        spanStyle: {
            color: "#567900",
            fontSize: "70px",
            fontWeight: "800",
            textShadow: "2px 3px 4px rgb(0, 0, 0)",
        },
        gridContainer: {
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1300px',
            margin: "20px",
            padding: '80px',
        },
        subtitle: {
            padding: '8px',
        },
        subText: {
            opacity: '0.7',
            padding: '10px',
        },
        largeImage: {
            width: '100%',
        },
    };
};
    
const useStyles = makeStyles(styles);
export default useStyles;