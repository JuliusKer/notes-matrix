export function TextInput(props) {
    const {value, onChange, title} = props;
    return (
        <div className='selectContainer'>
            <label>{title}</label>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}