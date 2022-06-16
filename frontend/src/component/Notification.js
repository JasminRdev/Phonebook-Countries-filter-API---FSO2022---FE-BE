
const errStyle = {
    background: "rgb(148, 49, 49)"
}




const Notification = ({ message}) => {
    if (message === null) {
        return null;
    }
    if(message.includes("Success")){
        return (
            <div className="error">{message}</div>
        )
    }
    if(message.includes("Error")){
        return (
            <div style={errStyle}  className="error">{message}</div>
        )
    }
} 

export default Notification