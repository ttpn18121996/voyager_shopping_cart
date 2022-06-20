export default function ValidationInput({ name, errors }) {
    const getMessage = () => {
        if (errors.hasOwnProperty(name)) {
            return (
                <label className="text-red-400 text-xs">
                    {
                        <label className="text-red-400 text-xs">
                            {errors[name]}
                        </label>
                    }
                </label>
            );
        }
        return null;
    };

    return Object.keys(errors).length > 0 && getMessage();
}
