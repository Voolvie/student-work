import React from "react";

export const Test = () => {
    const miasta = ["1","2","3"]
    return (
        <div>
            <ul>
                {miasta.map((miasto) => {
                    return <li key={miasto}>{miasto}</li>
                })}
            </ul>
        </div>
        
    )
}