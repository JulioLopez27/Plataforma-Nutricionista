/* eslint-disable react/prop-types */
export const Input = ({ name, label, ...props }) => (
    <div className="flex flex-col">
  
      <label htmlFor={name} className="font-semibold mb-2">{label}</label>
  
      <input
        {...props}
        name={name}
        id={name}
        className=" 
        rounded-xl 
        border-2 
        border-solid 
        border-gray-300 
        outline-gray-500 
        outline-1 
        p-1
        hover:bg-gray-200 
        " />
    </div>
  )