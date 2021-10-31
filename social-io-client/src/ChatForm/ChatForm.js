import React from 'react';

function ChatForm(props) {
 return (
    <form onSubmit={props.SubmitHandler} className="form-control">
        <input type="text" value={props.value} onChange={(ev) => props.handleChange(ev)} id={props.id} />
        <button type="submit" value="Submit">{props.button1Text}</button>
        <button type="button" onClick={props.clearChat}>{props.button2Text}</button>
    </form>
 );
}

export default ChatForm;