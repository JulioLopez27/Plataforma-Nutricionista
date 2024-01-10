

import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';


export const Custom_select = ({ name, label, error, dataFetcher, ...props }) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dataFetcher()
                setOptions(response.data);

            } catch (error) {
                console.log("🚀 ~ fetchData ~ error:", error)
            }
        };

        fetchData();

    }, [dataFetcher]);

    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className="p-1 font-semibold mb-2">{label}: </label>
            <select id={name} name={name} {...props} className={`rounded-xl border-2 border-solid border-gray-300 outline-gray-500 outline-1 p-1 hover:bg-gray-200 ${error && 'border-red-300'} `} >
                <option value="" >Selecciona...</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.nombre}
                    </option>
                ))}
            </select>
            <span className="p-1 text-red-500 text-sm">{error}</span>
        </div>
    );
};


Custom_select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    dataFetcher: PropTypes.func,
    error: PropTypes.bool,

}