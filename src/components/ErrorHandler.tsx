import React, { useEffect, useState } from "react";
import styles from "../../styles/ErrorHandler.module.css";


interface ErrorHandlerProps {
    errorHandler: any
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ errorHandler }) => {
const [show, setShow] = useState(false);

useEffect(() => {
        setShow(errorHandler.hasError);

        Object.keys(errorHandler.messages).forEach(key => {

        });
}, [errorHandler])

return (
    <div>
    {show ? (
        <div className={`alert alert-danger ${styles.alert_animation}`}>
        {
            Object.keys(errorHandler.messages).map((value, index) => {
                return(
                    <p key={index}>{errorHandler.messages[value]}</p>
                )
            })
        }
            <button type="button" className={styles.alert_button} onClick={() => setShow(false)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    ) : (
        ""
    )}
    </div>
)
}
