const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex' style={{ display: 'flex' }}>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
                    <span className='label-text'>Male</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
                <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
        </div>
    );
};
export default GenderCheckbox;
