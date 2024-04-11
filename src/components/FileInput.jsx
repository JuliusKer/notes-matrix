import React, { useRef } from 'react';

export function FileInput(props) {
    const { label, onLoad } = props;
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            onLoad(JSON.parse(content));
        };
        reader.readAsText(file);
        event.target.value = null;
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            <button onClick={handleClick} className='loadButton'>{label}</button>
        </>
    );
};
