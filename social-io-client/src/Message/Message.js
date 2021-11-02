import React from 'react';

class Message extends React.Component {
    render() {
        return (
            <div className={[
                    "form-control",
                    this.props.theme,
                ].join(" ")}
            >
                <div className="row">
                    <div className="col">
                        <strong>{this.props.username}</strong>
                        <br />{this.props.message}
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;
