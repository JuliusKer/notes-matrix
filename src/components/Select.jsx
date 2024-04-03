import './styles/Select.css';
import {map} from "lodash";
import PropTypes from "prop-types";
export function Select(props) {
    const {options, value, onChange, title} = props;
    return (
      <div className='selectContainer'>
          <label>{title}</label>
          <select
              value={value}
              onChange={e => onChange(e.target.value)}
          >
              {map(options, (option) => (
                  <option value={option.value}>{option.label}</option>
              ))}
          </select>
      </div>
  );
}

Select.defaultProps = {
    options: [],
    defaultValue: '',
    value: '',
};
Select.propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
};