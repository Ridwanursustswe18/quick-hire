const InputField = ({ label, required, error, children }) => (
  <div>
    <label className="font-epilogue font-semibold text-[14px] text-[#515B6F] block mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1 font-epilogue">{error}</p>}
  </div>
);
export default InputField;