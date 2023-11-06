import React, { useRef } from 'react'

export default function Layouts(props) {

    // start function scroll top
    const ref = useRef()
    useEffect(() => ref.current.scrollTo(0, 0));
    // start function scroll top 

    return (
        <div className="super-app-container-light">
            <div ref={ref} className="scroll-auto-light">
                {props.children}
            </div>
        </div>
    )
}

