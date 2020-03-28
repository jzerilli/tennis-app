import React from 'react'

export default function WinnerOutput(props) {
    return (
        <div className = "output">
            <h1>Predicted Winner: {props.winner} </h1>
            <h2>({props.winner_conf}% Confidence)</h2>
        </div>
    )
}
